import { useMatchStore } from "../store/useMatchStore";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Zap, Sparkles } from "lucide-react";

const SwipeFeedback = () => {
  const { swipeFeedback } = useMatchStore();

  const getFeedbackConfig = () => {
    switch (swipeFeedback) {
      case "liked":
        return {
          text: "INTEREST_CONFIRMED",
          icon: <Heart className="w-8 h-8" />,
          color: "text-green-400",
          bg: "bg-green-900/30",
          border: "border-green-500/50",
          animation: { scale: [1, 1.2, 1], opacity: [0, 1, 0] }
        };
      case "passed":
        return {
          text: "PROFILE_REJECTED",
          icon: <X className="w-8 h-8" />,
          color: "text-red-400",
          bg: "bg-red-900/30",
          border: "border-red-500/50",
          animation: { x: [-20, 0, 20, 0], opacity: [0, 1, 0] }
        };
      case "matched":
        return {
          text: "QUANTUM_MATCH!",
          icon: <Sparkles className="w-8 h-8" />,
          color: "text-pink-400",
          bg: "bg-pink-900/30",
          border: "border-pink-500/50",
          animation: { 
            scale: [1, 1.5, 1],
            rotate: [0, 10, -10, 0],
            opacity: [0, 1, 1, 0]
          }
        };
      default:
        return null;
    }
  };

  const feedback = getFeedbackConfig();

  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          className={`
            fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${feedback.color} ${feedback.bg} ${feedback.border}
            rounded-xl px-6 py-4 border backdrop-blur-sm
            flex flex-col items-center justify-center gap-2
            shadow-lg z-50 font-mono
          `}
          initial={{ opacity: 0, y: -20 }}
          animate={feedback.animation}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            {feedback.icon}
            <span className="text-xl font-bold tracking-wider">
              {feedback.text}
            </span>
          </div>
          {swipeFeedback === "matched" && (
            <motion.div
              className="flex items-center gap-1 text-xs text-yellow-300 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Zap className="w-4 h-4" />
              <span>CONNECTION_ESTABLISHED</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwipeFeedback;