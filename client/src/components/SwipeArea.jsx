import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Rocket, Code, Zap, Binary } from "lucide-react";
import { useState, useEffect } from "react";

const techIcons = [Cpu, Rocket, Code, Zap, Binary];

const SwipeArea = () => {
  const { userProfiles, swipeRight, swipeLeft } = useMatchStore();
  const [activeTechIcon, setActiveTechIcon] = useState(0);
  const [direction, setDirection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(userProfiles.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentIndex(userProfiles.length - 1);
  }, [userProfiles]);

  const TechIcon = techIcons[activeTechIcon];

  const handleSwipe = (dir, user) => {
    setDirection(dir);
    if (dir === "right") {
      swipeRight(user);
    } else if (dir === "left") {
      swipeLeft(user);
    }
    setTimeout(() => setDirection(null), 500);
  };

  const swipe = async (dir) => {
    if (currentIndex < 0) return;
    await handleSwipe(dir, userProfiles[currentIndex]);
  };

  return (
    <div className="relative w-full max-w-sm h-[32rem]">
      {/* Tech overlay elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {direction === "right" && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 text-6xl opacity-70"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✓
          </motion.div>
        )}
        {direction === "left" && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400 text-6xl opacity-70"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✕
          </motion.div>
        )}
      </div>

      {userProfiles.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-gray-800/80 rounded-xl border border-gray-700 backdrop-blur-sm">
            <TechIcon className="mx-auto text-purple-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-200 mb-2 font-mono">
              no_more_profiles
            </h3>
            <p className="text-gray-400 font-mono">
              refresh_database_or_expand_search_parameters
            </p>
          </div>
        </div>
      )}

      {userProfiles.map((user, index) => (
        <TinderCard
          className={`absolute shadow-none ${index === currentIndex ? 'z-10' : 'z-0'}`}
          key={user._id}
          onSwipe={(dir) => handleSwipe(dir, user)}
          swipeRequirementType="position"
          swipeThreshold={100}
          preventSwipe={["up", "down"]}
          onCardLeftScreen={() => setCurrentIndex(index - 1)}
        >
          <motion.div
            className="card bg-gray-800 w-96 h-[32rem] select-none rounded-xl overflow-hidden border border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-3/4">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1">
                <Zap size={12} className="text-yellow-300" />
                <span>MATCH_POTENTIAL: {Math.floor(Math.random() * 30) + 70}%</span>
              </div>
            </div>
            <div className="card-body bg-gradient-to-b from-gray-800 to-gray-900 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-2xl text-white font-mono">
                    {user.name}, <span className="text-purple-400">{user.age}</span>
                  </h2>
                  {user.techStack && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => swipe('left')}
                    className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                  >
                    ✕
                  </button>
                  <button 
                    onClick={() => swipe('right')}
                    className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors"
                  >
                    ✓
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-300 text-sm font-mono">
                  {user.bio || "Tech enthusiast looking for meaningful connections"}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div className="text-xs text-gray-500 font-mono">
                  ID: {user._id.slice(0, 6)}...{user._id.slice(-4)}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-mono">ONLINE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </TinderCard>
      ))}

      {/* Floating action buttons for mobile */}
      <div className="md:hidden fixed bottom-8 left-0 right-0 flex justify-center gap-8 z-20">
        <motion.button
          onClick={() => swipe('left')}
          className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 border-2 border-red-500/30 hover:bg-red-500/30 shadow-lg shadow-red-500/10 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">✕</span>
        </motion.button>
        <motion.button
          onClick={() => swipe('right')}
          className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border-2 border-green-500/30 hover:bg-green-500/30 shadow-lg shadow-green-500/10 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">✓</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SwipeArea;