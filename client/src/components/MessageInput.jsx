import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Send, Smile, Code, Cpu, Zap, Terminal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

const MessageInput = ({ match }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  const { sendMessage } = useMessageStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(match._id, message);
      setMessage("");
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, isTyping]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isTyping && (
          <motion.div 
            className="absolute -top-8 left-0 bg-gray-800 text-green-400 text-xs px-2 py-1 rounded-t-md font-mono flex items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>ENCODING_MESSAGE...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSendMessage} className="flex relative">
        <motion.button
          type="button"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            inputRef.current.focus();
          }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Smile size={20} />
        </motion.button>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleChange}
          className="flex-grow p-3 pl-10 rounded-l-xl border-2 border-gray-700 bg-gray-800 text-gray-200
          focus:outline-none focus:border-purple-500 font-mono placeholder-gray-500"
          placeholder={`message_${match.name.split(' ')[0].toLowerCase()}`}
          onFocus={() => message.length > 0 && setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        />

        <motion.button
          type="submit"
          className={`p-3 rounded-r-xl flex items-center justify-center ${
            message.trim()
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-gray-700 text-gray-500"
          }`}
          whileHover={message.trim() ? { scale: 1.05 } : {}}
          whileTap={message.trim() ? { scale: 0.95 } : {}}
          disabled={!message.trim()}
        >
          <Send size={20} />
        </motion.button>
      </form>

      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            ref={emojiPickerRef}
            className="absolute bottom-16 left-0 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <EmojiPicker
              width={300}
              height={400}
              onEmojiClick={(emojiObject) => {
                setMessage((prevMessage) => prevMessage + emojiObject.emoji);
                inputRef.current.focus();
              }}
              theme="dark"
              searchPlaceholder="SEARCH_EMOJI"
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageInput;