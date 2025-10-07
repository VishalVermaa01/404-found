import { useEffect, useState } from "react";
import { Heart, Loader, MessageCircle, X, Cpu, Rocket, Code, Zap, Binary } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";
import { motion, AnimatePresence } from "framer-motion";

const techIcons = [Cpu, Rocket, Code, Zap, Binary];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTechIcon, setActiveTechIcon] = useState(0);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  useEffect(() => {
    getMyMatches();
  }, [getMyMatches]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const TechIcon = techIcons[activeTechIcon];

  return (
    <>
      <motion.div
        className={`
          fixed inset-y-0 left-0 z-10 w-72 max-w-full bg-gray-800 border-r border-gray-800 shadow-2xl overflow-hidden transition-transform duration-300
          ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-1/4
        `}
        initial={{ x: -256 }}
        animate={{ x: isOpen ? -256 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 pb-6 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <TechIcon className="text-purple-400" size={24} />
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                // matches
              </h2>
            </motion.div>
            <button
              className="lg:hidden p-1 text-gray-400 hover:text-purple-400 focus:outline-none transition-colors"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 z-10 relative bg-gray-900/50">
            {isLoadingMyMatches ? (
              <LoadingState />
            ) : matches.length === 0 ? (
              <NoMatchesFound TechIcon={TechIcon} />
            ) : (
              <div className="space-y-2">
                {matches.map((match) => (
                  <motion.div
                    key={match._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={`/chat/${match._id}`}>
                      <div className="flex items-center mb-3 cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-all duration-300 border border-gray-800 hover:border-purple-400/30 group">
                        <div className="relative">
                          <img
                            src={match.image || "/avatar.png"}
                            alt="User avatar"
                            className="size-12 object-cover rounded-full mr-3 border-2 border-purple-400 group-hover:border-pink-400 transition-colors"
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
                          <h3 className="font-semibold text-gray-200 group-hover:text-purple-300 transition-colors font-mono">
                            {match.name || "Anonymous Coder"}
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-pink-300 transition-colors">
                            {match.techStack?.join(" • ") || "Tech enthusiast"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 text-xs text-gray-500 font-mono bg-gray-900/80">
            <div className="flex justify-between items-center">
              <span>v2.3.1</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>online</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        className="lg:hidden fixed top-4 left-4 p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-md z-0 shadow-lg hover:shadow-purple-500/30 transition-all"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <MessageCircle size={24} />
      </motion.button>
    </>
  );
};

const NoMatchesFound = ({ TechIcon }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
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
      <TechIcon className="text-purple-400 mb-4" size={48} />
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-200 mb-2 font-mono">no_matches_found</h3>
    <p className="text-gray-400 max-w-xs mb-6">
      Continue swiping to find your perfect tech companion.
    </p>
    <div className="p-3 border border-purple-400/30 rounded-lg bg-gray-800/50 text-xs text-purple-300 font-mono">
      <span className="opacity-70">// </span>
      <span className="opacity-90">while (!match) {'{'} keepSwiping(); {'}'}</span>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <Cpu className="text-purple-400 mb-4" size={48} />
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-200 mb-2 font-mono">loading_matches</h3>
    <p className="text-gray-400 max-w-xs mb-4">
      Querying the database for potential connections...
    </p>
    <div className="w-full bg-gray-800 rounded-full h-1.5">
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  </div>
);

export default Sidebar;