import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown, Rocket, Code, Cpu, Binary, Network, Bug, Zap } from "lucide-react";
import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

const techIcons = [Rocket, Code, Cpu, Binary, Network, Bug, Zap];

const HomePage = () => {
  const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
    useMatchStore();

  const { authUser } = useAuthStore();
  const [activeTechIcon, setActiveTechIcon] = useState(0);

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  useEffect(() => {
    authUser && subscribeToNewMatches();

    return () => {
      unsubscribeFromNewMatches();
    };
  }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const TechIcon = techIcons[activeTechIcon];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 overflow-hidden">
      {/* Animated galaxy background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(50)].map((_, i) => (
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

      <Sidebar />
      
      <div className="flex-grow flex flex-col overflow-hidden relative z-10">
        <Header />
        
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          {/* Floating tech elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => {
              const Icon = techIcons[i % techIcons.length];
              return (
                <motion.div
                  key={i}
                  className="absolute text-purple-400 opacity-10"
                  style={{
                    fontSize: `${Math.random() * 30 + 20}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    y: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Icon size="1em" />
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {userProfiles.length > 0 && !isLoadingUserProfiles && (
              <motion.div
                key="profiles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl"
              >
                <div className="relative">
                  <SwipeArea />
                  <SwipeFeedback />
                </div>
              </motion.div>
            )}

            {userProfiles.length === 0 && !isLoadingUserProfiles && (
              <motion.div
                key="no-profiles"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <NoMoreProfiles TechIcon={TechIcon} />
              </motion.div>
            )}

            {isLoadingUserProfiles && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingUI />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Techy stats bar */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <div className="flex justify-around items-center text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Zap className="text-purple-400" size={16} />
                  <span>
                    <span className="font-mono text-purple-300">{userProfiles.length}</span> potential matches
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Code className="text-blue-400" size={16} />
                  <span>Algorithm v3.1.4</span>
                </div>
                <div className="h-4 w-px bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Network className="text-green-400" size={16} />
                  <span>Quantum encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const NoMoreProfiles = ({ TechIcon }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 max-w-2xl mx-auto">
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <TechIcon className="text-purple-400 mb-6" size={80} />
    </motion.div>
    <h2 className="text-4xl font-bold text-white mb-4 font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
      // No more profiles found
    </h2>
    <p className="text-xl text-gray-300 mb-6">
      You've reached the edge of our dating universe. <br />
      Either you're too picky or we need to expand our database.
    </p>
    <div className="mt-6 p-4 border border-purple-400 rounded-lg bg-gray-800 bg-opacity-50">
      <div className="flex items-center gap-3 text-purple-300">
        <span className="font-mono">while (true) {'{'}</span>
        <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></div>
        <span className="font-mono">await findMoreTechLovers();</span>
        <span className="font-mono">{'}'}</span>
      </div>
    </div>
  </div>
);

const LoadingUI = () => {
  return (
    <div className="relative w-full max-w-sm h-[28rem]">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="card bg-gray-800 w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-700 shadow-lg"
      >
        <div className="px-4 pt-4 h-3/4 relative overflow-hidden">
          <div className="w-full h-full bg-gray-700 rounded-lg animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
          </div>
        </div>
        <div className="card-body bg-gradient-to-b from-gray-800 to-gray-900 p-6">
          <div className="space-y-3">
            <div className="h-6 bg-gray-700 rounded-full w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded-full w-1/2 animate-pulse"></div>
            <div className="flex gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse"></div>
            <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
      <div className="absolute -bottom-4 -right-4">
        <div className="text-xs text-gray-500 font-mono px-2 py-1 bg-gray-800 rounded">
          LOADING PROFILE...
        </div>
      </div>
    </div>
  );
};

export default HomePage;