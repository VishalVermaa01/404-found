import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX, Cpu, Rocket, Code, Zap, Binary } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageInput from "../components/MessageInput";

const techIcons = [Cpu, Rocket, Code, Zap, Binary];

const ChatPage = () => {
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const [activeTechIcon, setActiveTechIcon] = useState(0);

  const match = matches.find((m) => m?._id === id);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (authUser && id) {
      getMyMatches();
      getMessages(id);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [getMyMatches, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages, id]);

  if (isLoadingMyMatches) return <LoadingMessagesUI />;
  if (!match) return <MatchNotFound />;

  const TechIcon = techIcons[activeTechIcon];

  return (
    <div className="flex flex-col h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated galaxy background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Header />

      <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full relative z-10">
        <motion.div 
          className="flex items-center mb-4 bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-700"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative">
            <img
              src={match.image || "/avatar.png"}
              className="w-12 h-12 object-cover rounded-full mr-3 border-2 border-purple-400"
            />
            <motion.div
              className="absolute -inset-0 rounded-full border-2 border-transparent group-hover:border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                borderColor: ["#ec4899", "#a855f7", "#ec4899"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-200 font-mono">{match.name}</h2>
            {match.techStack && (
              <p className="text-xs text-gray-400 font-mono">
                {match.techStack.join(" • ")}
              </p>
            )}
          </div>
        </motion.div>

        <div className="flex-grow overflow-y-auto mb-4 bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700">
          {messages.length === 0 ? (
            <div className="text-center py-8 flex flex-col items-center">
              <TechIcon className="text-purple-400 mb-4" size={48} />
                <p className="text-gray-400 font-mono">
                  start_conversation_with {match.name.split(" ")[0]}
              </p>
              <div className="mt-4 p-3 border border-purple-400/30 rounded-lg bg-gray-700/50 text-xs text-purple-300 font-mono">
                <span className="opacity-70">// </span>
                <span className="opacity-90">type_your_first_message()</span>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md font-mono ${
                    msg.sender === authUser._id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {msg.content}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </motion.div>
            ))
          )}
        </div>
        <MessageInput match={match} />
      </div>
    </div>
  );
};

const MatchNotFound = () => {
  const [activeTechIcon, setActiveTechIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const TechIcon = techIcons[activeTechIcon];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Animated galaxy background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 text-center relative z-10">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <TechIcon className="mx-auto text-purple-400 mb-4" size={64} />
        </motion.div>
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2 font-mono">
          error_404
        </h2>
        <p className="text-gray-400 font-mono">match_not_found</p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Link
            to='/'
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-mono inline-flex items-center gap-2"
          >
            <Zap size={16} className="text-yellow-200" />
            return_to_home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const LoadingMessagesUI = () => {
  const [activeTechIcon, setActiveTechIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const TechIcon = techIcons[activeTechIcon];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Animated galaxy background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 text-center relative z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <TechIcon className="mx-auto text-purple-400 mb-4" size={48} />
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-2 font-mono">
          loading_chat
        </h2>
        <p className="text-gray-400 font-mono mb-4">decrypting_messages</p>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;