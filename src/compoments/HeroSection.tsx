import { FaSun, FaChartLine, FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { CalculationModal } from "./CalculationModal";

export const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  const featureItems = [
    { icon: <FaSun className="text-yellow-400 text-xl" />, text: "Solar Production Analysis" },
    { icon: <FaChartLine className="text-green-400 text-xl" />, text: "Energy Consumption Insights" },
    { icon: <FaExchangeAlt className="text-blue-400 text-xl" />, text: "Buy/Sell Recommendations" },
  ];
  
  return (
    <div className="relative min-h-[500px] h-screen w-full overflow-hidden">
      {/* Background with overlay gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 filter blur-[2px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-blue-900/50" />
      
      {/* Animated particles or light effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500 rounded-full opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight"
          >
            Optimize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">Solar Energy</span> Decisions
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Smart analytics to help you decide when to buy or sell electricity based on your solar production data
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            {featureItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <span className="text-white font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px 8px rgba(250, 204, 21, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenModal}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-600 to-green-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 text-base sm:text-lg"
            >
              <span className="flex items-center gap-2">
                <FaSun className="text-yellow-300" />
                Calculate Energy Savings
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {isModalOpen && <CalculationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
