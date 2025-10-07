import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Rocket, Code, Zap, Binary } from "lucide-react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const techIcons = [Cpu, Rocket, Code, Zap, Binary];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [activeTechIcon, setActiveTechIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const TechIcon = techIcons[activeTechIcon];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      {/* Animated galaxy background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
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

      {/* Floating tech elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(8)].map((_, i) => {
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

      <div className="w-full max-w-md relative z-10">
        <motion.div 
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <TechIcon className="text-purple-400" size={48} />
        </motion.div>
        
        <h2 className="text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-8 font-mono">
          {isLogin ? "> login" : "> register"}
        </h2>

        <motion.div 
          className="bg-gray-800 border border-gray-700 shadow-2xl rounded-xl p-8 backdrop-blur-sm bg-opacity-70"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SignUpForm />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 font-mono">
              {isLogin ? "new_to_platform?" : "already_have_account?"}
            </p>

            <motion.button
              onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              className="mt-2 text-purple-400 hover:text-pink-400 font-medium transition-colors duration-300 font-mono flex items-center justify-center mx-auto gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Zap size={16} className="text-yellow-300" />
              {isLogin ? "create_account" : "login"}
            </motion.button>
          </div>
        </motion.div>

        <div className="mt-6 text-center text-xs text-gray-500 font-mono">
          <p>v2.3.1 • quantum_encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;