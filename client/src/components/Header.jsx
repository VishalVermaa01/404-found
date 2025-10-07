import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu, Rocket, Cpu, Code, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [techIcon, setTechIcon] = useState(0);
  const techIcons = [Rocket, Cpu, Code, Zap];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const CurrentTechIcon = techIcons[techIcon];

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg relative ">
      {/* Animated tech background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(3)].map((_, i) => {
          const Icon = techIcons[i % techIcons.length];
          return (
            <motion.div
              key={i}
              className="absolute text-purple-400"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Flame className="w-8 h-8 text-purple-400 group-hover:text-pink-400 transition-colors" />
                <motion.div
                  className="absolute -inset-1 bg-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity"
                  initial={{ scale: 0.8 }}
                />
              </motion.div>
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 hidden sm:inline font-mono"
                whileHover={{ scale: 1.05 }}
              >
                <span className="opacity-70">{"> "}</span>
                404_Found
              </motion.span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <img
                      src={authUser.image || "/avatar.png"}
                      className="h-10 w-10 object-cover rounded-full border-2 border-purple-400 group-hover:border-pink-400 transition-colors"
                      alt="User image"
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
                  <span className="text-gray-200 font-medium font-mono">
                    {authUser.name || "User"}
                  </span>
                </motion.button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link
                        to="/profile"
                        className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="mr-2 text-purple-400" size={16} />
                        <span className="font-mono">profile</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center transition-colors"
                      >
                        <LogOut className="mr-2 text-pink-400" size={16} />
                        <span className="font-mono">logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/auth"
                    className="text-gray-300 hover:text-purple-300 transition duration-150 ease-in-out font-mono flex items-center gap-2"
                  >
                    <CurrentTechIcon className="text-pink-400" size={18} />
                    <span>login</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium
                   hover:from-purple-600 hover:to-pink-600 transition duration-150 ease-in-out shadow-lg hover:shadow-purple-500/20 font-mono flex items-center gap-2"
                  >
                    <Zap className="text-yellow-200" size={16} />
                    <span>sign_up</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="size-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-800 border-t border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {authUser ? (
                <>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="text-purple-400" size={16} />
                      <span className="font-mono">profile</span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="text-pink-400" size={16} />
                      <span className="font-mono">logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/auth"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <CurrentTechIcon className="text-purple-400" size={16} />
                      <span className="font-mono">login</span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/auth"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Zap className="text-pink-400" size={16} />
                      <span className="font-mono">sign_up</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};