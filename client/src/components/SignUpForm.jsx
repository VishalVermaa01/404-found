import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { Cpu, Rocket, Code, Zap, Binary } from "lucide-react";

const techIcons = [Cpu, Rocket, Code, Zap, Binary];

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [activeTechIcon, setActiveTechIcon] = useState(0);

  const { signup, loading } = useAuthStore();

  const TechIcon = techIcons[activeTechIcon];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      {/* Floating tech elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => {
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

      <form
        className="space-y-6 relative z-10"
        onSubmit={(e) => {
          e.preventDefault();
          signup({ name, email, password, gender, age, genderPreference });
        }}
      >
        <div className="text-center mb-6">
          <motion.div 
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <TechIcon className="text-purple-400" size={48} />
          </motion.div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
            // create_account
          </h2>
          <p className="text-gray-400 mt-2 text-sm font-mono">
            Join our tech dating universe
          </p>
        </div>

        {/* NAME */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 font-mono">
            username
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-200 font-mono"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 font-mono">
            email_address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-200 font-mono"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 font-mono">
            password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-200 font-mono"
            />
          </div>
        </div>

        {/* AGE */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-300 font-mono">
            age
          </label>
          <div className="mt-1">
            <input
              id="age"
              name="age"
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="120"
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-200 font-mono"
            />
          </div>
        </div>

        {/* GENDER */}
        <div>
          <label className="block text-sm font-medium text-gray-300 font-mono">your_gender</label>
          <div className="mt-2 flex gap-4">
            {["male", "female"].map((option) => (
              <motion.div 
                key={option}
                whileHover={{ scale: 1.03 }}
                className="flex items-center"
              >
                <input
                  id={option}
                  name="gender"
                  type="checkbox"
                  checked={gender === option}
                  onChange={() => setGender(option)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor={option} className="ml-2 block text-sm text-gray-300 font-mono">
                  {option}
                </label>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GENDER PREFERENCE */}
        <div>
          <label className="block text-sm font-medium text-gray-300 font-mono">preference</label>
          <div className="mt-2 space-y-2">
            {["male", "female", "both"].map((option) => (
              <motion.div 
                key={option}
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <input
                  id={`prefer-${option}`}
                  name="gender-preference"
                  type="radio"
                  value={option}
                  checked={genderPreference === option}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 bg-gray-700"
                />
                <label htmlFor={`prefer-${option}`} className="ml-2 block text-sm text-gray-300 font-mono">
                  {option}
                </label>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white font-mono ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu size={16} />
                </motion.div>
                processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-200" />
                create_account
              </span>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SignUpForm;