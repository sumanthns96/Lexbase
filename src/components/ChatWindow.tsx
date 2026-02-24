import { useConversation } from "@elevenlabs/react";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, User, Bot, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MorphPanel } from "@/components/ui/ai-input";
import { TermsDialog } from "@/components/ui/TermsDialog";

type Message = {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: number;
};

const ChatWindow = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false); // New state for mic mute
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Terms of Use state
  const [showTerms, setShowTerms] = useState(false);
  const [pendingAction, setPendingAction] = useState<"voice" | { type: "text", text: string } | null>(null);
  const [hasGivenConsent, setHasGivenConsent] = useState(() => {
    // Only check sessionStorage on the client side
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("lexbase_consent") === "true";
    }
    return false;
  });

  const conversation = useConversation({
    micMuted: isMicMuted, // Pass mute state to SDK
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message: any) => {
      console.log("Message:", message);

      // New SDK structure emits { source: "ai" | "user", message: string }
      if (message.source === "user" && message.message) {
        addMessage("user", message.message);
      } else if (message.source === "ai" && message.message) {
        addMessage("agent", message.message);
      }
      // Handle User Transcription (Voice Input) - legacy/raw fallback
      else if (message.type === "user_transcript" && message.user_transcription_event?.user_transcript) {
        addMessage("user", message.user_transcription_event.user_transcript);
      }
      // Handle User Text Message - legacy/raw fallback
      else if (message.type === "user_message" && message.text) {
        addMessage("user", message.text);
      }
      // Handle Agent Response (Voice/Text Output) - legacy/raw fallback
      else if (message.type === "agent_response" && message.agent_response_event?.agent_response) {
        addMessage("agent", message.agent_response_event.agent_response);
      }
      // Handle fallback or text-only messages
      else if (typeof message === "object" && message.text) {
        addMessage("agent", message.text);
      } else if (typeof message === "string" && message.trim().length > 0) {
        addMessage("agent", message);
      }
    },
    onError: (error) => console.error("Error:", error),
  });

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  // Handle Mute logic
  useEffect(() => {
    conversation.setVolume({ volume: isMuted ? 0 : 1 });
  }, [isMuted, conversation]);

  const addMessage = (role: "user" | "agent", text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        role,
        text,
        timestamp: Date.now(),
      },
    ]);
  };

  const startConversation = useCallback(async () => {
    if (!hasGivenConsent) {
      setPendingAction("voice");
      setShowTerms(true);
      return;
    }

    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: "agent_4801kh02yzw9egnv2dfx4d957jzj",
        // @ts-ignore
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (!hasGivenConsent) {
      setPendingAction({ type: "text", text });
      setShowTerms(true);
      return;
    }

    if (!hasStarted) setHasStarted(true);

    addMessage("user", text);

    if (!isConnected) {
      // Inline start for text flow
      setIsConnecting(true);
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({
          agentId: "agent_4801kh02yzw9egnv2dfx4d957jzj",
          // @ts-ignore
          connectionType: "webrtc",
        });
      } catch (error) {
        console.error("Failed to start conversation:", error);
      } finally {
        setIsConnecting(false);
      }
    }

    try {
      await conversation.sendUserMessage(text);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally handle error in UI
    }
  };

  const handleChatOpen = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      if (!isConnected) {
        startConversation();
      }
    }
  }, [hasStarted, isConnected, startConversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleAgreeTerms = async () => {
    sessionStorage.setItem("lexbase_consent", "true");
    setHasGivenConsent(true);
    setShowTerms(false);

    // Execute the action that was interrupted
    if (pendingAction === "voice") {
      // Start voice directly without checking consent again
      setIsConnecting(true);
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({
          agentId: "agent_4801kh02yzw9egnv2dfx4d957jzj",
          // @ts-ignore
          connectionType: "webrtc",
        });
      } catch (error) {
        console.error("Failed to start conversation:", error);
      } finally {
        setIsConnecting(false);
      }
    } else if (pendingAction?.type === "text") {
      handleSendMessage(pendingAction.text);
    }
    setPendingAction(null);
  };

  const handleDeclineTerms = () => {
    setShowTerms(false);
    setPendingAction(null);
  };


  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      <TermsDialog
        isOpen={showTerms}
        onAgree={handleAgreeTerms}
        onDecline={handleDeclineTerms}
      />

      {/* Visualizer / Orb Section */}
      <motion.div
        className="relative w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center"
        animate={isSpeaking ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={isSpeaking ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {/* Mute Button - Top Right */}
        <div className="absolute -top-4 -right-12 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm border border-border/50 h-10 w-10"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-muted-foreground" /> : <Volume2 className="w-5 h-5 text-foreground" />}
          </Button>
        </div>

        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full overflow-hidden animate-orb-spin opacity-80">
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(
                from 0deg,
                hsl(215 100% 60%) 0%,
                hsl(230 15% 6%) 20%,
                hsl(215 80% 45%) 40%,
                hsl(230 15% 6%) 60%,
                hsl(215 100% 65%) 80%,
                hsl(215 100% 60%) 100%
              )`,
            }}
          />
        </div>

        {/* Inner glass circle */}
        <div className="absolute inset-[4px] rounded-full bg-background/95 backdrop-blur-3xl z-10" />

        {/* Dynamic Inner Glow */}
        <div className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-1000",
          isSpeaking ? "opacity-30 bg-primary/30 blur-2xl" : "opacity-0"
        )} />

        {/* Center pill button */}
        <div className="relative z-20 flex items-center gap-4">
          {isConnected && (
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full w-10 h-10 transition-all duration-300",
                isMicMuted ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "bg-card/50 hover:bg-card/80"
              )}
              onClick={() => setIsMicMuted(!isMicMuted)}
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
          )}
          <button
            onClick={isConnected ? stopConversation : startConversation}
            disabled={isConnecting}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-foreground/95 text-background font-medium text-sm tracking-tight transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isConnected ? (
              <>
                <MicOff className="w-4 h-4" /> {/* Maybe change this to PhoneOff or X? User used MicOff for End Call originally */}
                <span>End Call</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>{isConnecting ? "Connecting..." : "Talk to Lexbase"}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Chat Interface - Transparent & Seamless */}
      <div className={cn(
        "w-full bg-transparent border-none p-0 relative flex flex-col justify-end transition-all duration-500 ease-in-out",
        hasStarted ? "h-[400px]" : "h-auto"
      )}>

        {/* Messages Area - Only visible when started */}
        {hasStarted && (
          <ScrollArea className="flex-1 pr-4 -mr-4 mb-8 py-2" ref={scrollRef}>
            <div className="flex flex-col gap-4 pb-4">
              {messages.length === 0 ? (
                // Removed placeholder text completely
                <div className="h-full" />
              ) : (
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-muted/50 border border-border/50 rounded-tl-sm text-foreground"
                      )}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </ScrollArea>
        )}

        {/* AI Input Area - Fixed relative to container */}
        <div className="w-full relative z-10">
          <MorphPanel onSubmit={handleSendMessage} onOpen={handleChatOpen} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
