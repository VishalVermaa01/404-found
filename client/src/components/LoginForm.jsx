import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Key, Terminal, Eye, EyeOff, Zap } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const { login, loading } = useAuthStore();

  const icons = [Cpu, Key, Terminal];
  const ActiveIcon = icons[activeIcon];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await login({ email, password });
    setIsProcessing(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(3)].map((_, i) => {
          const Icon = icons[i];
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

      <div className="text-center mb-8">
        <motion.div 
          className="flex justify-center mb-4"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ActiveIcon className="text-purple-400" size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
          SYSTEM_LOGIN
        </h2>
        <p className="text-gray-400 mt-2 text-sm font-mono">
          Enter your credentials to access the network
        </p>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 font-mono mb-1">
          USER_EMAIL:
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm 
                      placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent bg-gray-800 text-gray-200 font-mono"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 font-mono mb-1">
          ENCRYPTION_KEY:
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm 
                      placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent bg-gray-800 text-gray-200 font-mono pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <motion.button
          type="submit"
          className={`w-full py-3 rounded-lg font-mono flex items-center justify-center gap-2 ${
            isProcessing || loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20"
          }`}
          disabled={isProcessing || loading}
          whileHover={!(isProcessing || loading) ? { scale: 1.02 } : {}}
          whileTap={!(isProcessing || loading) ? { scale: 0.98 } : {}}
        >
          {isProcessing || loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Cpu size={18} />
              </motion.div>
              <span>AUTHENTICATING...</span>
            </>
          ) : (
            <>
              <Zap size={18} className="text-yellow-300" />
              <span>ACCESS_NETWORK</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="text-center text-xs text-gray-500 font-mono mt-6">
        <p>v2.4.1 • Quantum Encrypted Connection</p>
      </div>
    </motion.form>
  );
};

export default LoginForm;