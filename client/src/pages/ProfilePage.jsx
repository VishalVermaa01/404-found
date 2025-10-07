import { useRef, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Rocket, Code, Zap, Binary, Upload, Terminal, Server, Database, CpuIcon } from "lucide-react";

const techIcons = [Cpu, Rocket, Code, Zap, Binary, Terminal, Server, Database];

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: authUser.name || "",
    bio: authUser.bio || "",
    age: authUser.age || "",
    gender: authUser.gender || "",
    genderPreference: authUser.genderPreference || "",
    techStack: authUser.techStack || ["JavaScript", "React", "Node.js"],
    image: authUser.image || null
  });
  const [activeTechIcon, setActiveTechIcon] = useState(0);
  const [isEditingTechStack, setIsEditingTechStack] = useState(false);
  const [newTech, setNewTech] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);
  const { loading, updateProfile } = useUserStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIcon((prev) => (prev + 1) % techIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const TechIcon = techIcons[activeTechIcon];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await updateProfile(formData);
    setIsProcessing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addTech = () => {
    if (newTech && !formData.techStack.includes(newTech)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, newTech]
      }));
      setNewTech("");
    }
  };

  const removeTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Animated matrix background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, window.innerHeight],
              opacity: [0.1, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>

      <Header />

      <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className="flex justify-center mb-6">
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
              <TechIcon className="text-purple-400" size={48} />
            </motion.div>
          </div>
          <h1 className="text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-mono tracking-tighter">
            PROFILE_EDITOR.EXE
          </h1>
          <p className="text-center text-gray-400 mt-2 font-mono text-sm">
            v2.4.1 - Quantum Encryption Enabled
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
          <motion.div 
            className="bg-gray-800/80 py-8 px-6 shadow-2xl rounded-xl border border-gray-700 backdrop-blur-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-purple-500/50 relative">
                    {formData.image ? (
                      <img 
                        src={formData.image} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <CpuIcon className="text-gray-500" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <motion.button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="px-4 py-2 bg-purple-600/80 hover:bg-purple-500 rounded-md text-white text-sm font-mono flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Upload size={16} />
                        UPLOAD_IMAGE
                      </motion.button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-xs text-gray-400 font-mono mb-1">USER_ID: {authUser._id.slice(0, 8)}...</div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-green-400 text-xs font-mono">ONLINE</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Section */}
                <div className="w-full mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-300 font-mono text-sm">TECH_STACK:</h3>
                    <button 
                      onClick={() => setIsEditingTechStack(!isEditingTechStack)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-mono"
                    >
                      {isEditingTechStack ? "CANCEL" : "EDIT"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.techStack.map((tech) => (
                      <motion.div
                        key={tech}
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs font-mono">
                          {tech}
                        </span>
                        {isEditingTechStack && (
                          <button
                            onClick={() => removeTech(tech)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  {isEditingTechStack && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        placeholder="Add technology..."
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-xs text-white font-mono"
                      />
                      <button
                        onClick={addTech}
                        className="bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded-md text-xs text-white font-mono"
                      >
                        ADD
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-gray-300 font-mono mb-1">
                      USERNAME:
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm text-gray-300 font-mono mb-1">
                      AGE:
                    </label>
                    <input
                      name="age"
                      type="number"
                      required
                      min="18"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm text-gray-300 font-mono mb-2">
                    GENDER:
                  </label>
                  <div className="flex gap-4">
                    {["male", "female"].map((option) => (
                      <motion.label
                        key={option}
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="gender"
                            value={option}
                            checked={formData.gender === option}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${formData.gender === option ? 'border-purple-500' : 'border-gray-500'} flex items-center justify-center`}>
                            {formData.gender === option && (
                              <motion.div
                                className="w-3 h-3 rounded-full bg-purple-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-300 font-mono text-sm capitalize">
                          {option}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Gender Preference */}
                <div>
                  <label className="block text-sm text-gray-300 font-mono mb-2">
                    PREFERENCE:
                  </label>
                  <div className="flex gap-4">
                    {["male", "female", "both"].map((option) => (
                      <motion.label
                        key={option}
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="genderPreference"
                            value={option}
                            checked={formData.genderPreference === option}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${formData.genderPreference === option ? 'border-purple-500' : 'border-gray-500'} flex items-center justify-center`}>
                            {formData.genderPreference === option && (
                              <motion.div
                                className="w-3 h-3 rounded-full bg-purple-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-300 font-mono text-sm capitalize">
                          {option}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm text-gray-300 font-mono mb-1">
                    BIO:
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full py-3 rounded-xl font-mono flex items-center justify-center gap-2 ${
                      isProcessing || loading
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20"
                    }`}
                    disabled={isProcessing || loading}
                    whileHover={!(isProcessing || loading) ? { scale: 1.01 } : {}}
                    whileTap={!(isProcessing || loading) ? { scale: 0.99 } : {}}
                  >
                    {isProcessing || loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Cpu size={18} />
                        </motion.div>
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={18} className="text-yellow-300" />
                        <span>UPDATE_PROFILE</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 py-2 px-4 text-xs text-gray-400 font-mono">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>SYSTEM_STATUS: <span className="text-green-400">OPERATIONAL</span></div>
          <div>SESSION: {new Date().toLocaleTimeString()}</div>
          <div>USER: {authUser.name || "ANONYMOUS"}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;