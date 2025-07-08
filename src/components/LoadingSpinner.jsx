import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBrain } = FiIcons;

const LoadingSpinner = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-block mb-4"
      >
        <SafeIcon icon={FiBrain} className="text-4xl text-indigo-600" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        AI is Solving Your Puzzle
      </h3>
      
      <p className="text-gray-600 mb-4">
        Analyzing patterns and finding the solution...
      </p>
      
      <div className="flex justify-center">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-indigo-600 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;