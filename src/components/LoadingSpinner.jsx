import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBrain } = FiIcons;

const LoadingSpinner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-10 text-center border border-gray-200"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-block mb-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-ping"></div>
        <SafeIcon icon={FiBrain} className="text-5xl text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text relative z-10" />
      </motion.div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
        AI is Solving Your Puzzle
      </h3>
      
      <p className="text-gray-600 mb-6 text-lg">
        Analyzing patterns and finding the solution...
      </p>
      
      <div className="flex justify-center mb-4">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                backgroundColor: ["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-blue-500 rounded-full"
            />
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Powered by GPT-4o Mini
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;