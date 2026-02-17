import { useConversation } from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Globe } from "lucide-react";

const ChatWindow = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: "agent_4801kh02yzw9egnv2dfx4d957jzj",
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

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Globe className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-sans text-sm font-semibold text-foreground">
            Immigration Support
          </h3>
          <p className="text-xs text-muted-foreground">
            {isConnected ? "Connected — speak now" : "Voice-powered assistant"}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-12">
        {/* Status orb */}
        <motion.div
          className={`flex h-28 w-28 items-center justify-center rounded-full border-2 ${
            isConnected
              ? conversation.isSpeaking
                ? "border-primary bg-primary/10"
                : "border-primary/50 bg-primary/5"
              : "border-border bg-secondary"
          }`}
          animate={
            isConnected && conversation.isSpeaking
              ? { scale: [1, 1.08, 1], borderColor: ["hsl(43 90% 55%)", "hsl(35 90% 50%)", "hsl(43 90% 55%)"] }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isConnected ? (
            <Mic className="h-10 w-10 text-primary" />
          ) : (
            <MicOff className="h-10 w-10 text-muted-foreground" />
          )}
        </motion.div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {isConnected
              ? conversation.isSpeaking
                ? "Agent is speaking..."
                : "Listening to you..."
              : "Start a voice conversation"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {isConnected
              ? "Ask about visas, green cards, asylum & more"
              : "Click below to connect with our AI assistant"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        {!isConnected ? (
          <button
            onClick={startConversation}
            disabled={isConnecting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-sans text-sm font-semibold text-primary-foreground transition-all hover:bg-gold-dim disabled:opacity-50"
          >
            <Mic className="h-4 w-4" />
            {isConnecting ? "Connecting..." : "Start Conversation"}
          </button>
        ) : (
          <button
            onClick={stopConversation}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 py-3 font-sans text-sm font-semibold text-destructive transition-all hover:bg-destructive/20"
          >
            <MicOff className="h-4 w-4" />
            End Conversation
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
