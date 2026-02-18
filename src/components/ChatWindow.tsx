import { useConversation } from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

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
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Glowing Orb */}
      <motion.div
        className="relative w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center animate-float"
        animate={isSpeaking ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={isSpeaking ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full overflow-hidden animate-orb-spin">
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
        <div className="absolute inset-[6px] rounded-full bg-background/90 backdrop-blur-xl z-10" />

        {/* Glow */}
        <div className="absolute inset-0 rounded-full orb-glow" />

        {/* Center pill button */}
        <button
          onClick={isConnected ? stopConversation : startConversation}
          disabled={isConnecting}
          className="relative z-20 flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-foreground/95 text-background font-medium text-sm tracking-tight transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50"
        >
          {isConnected ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>End Call</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Talk to Lexbase"}</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Status */}
      {isConnected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <p className="text-sm text-muted-foreground tracking-tight">
            {isSpeaking ? "Agent is speaking..." : "Listening..."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ChatWindow;
