import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiBook, FiLightbulb, FiTarget } = FiIcons;

const SolutionDisplay = ({ solution }) => {
  if (!solution) return null;

  const { steps, tips, explanation } = solution;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <div className="flex items-center gap-3">
          <SafeIcon icon={FiCheckCircle} className="text-green-600 text-2xl" />
          <div>
            <h3 className="font-semibold text-green-800">Puzzle Solved!</h3>
            <p className="text-green-700 text-sm">
              The AI has successfully solved your Sudoku puzzle
            </p>
          </div>
        </div>
      </motion.div>

      {/* Solution Steps */}
      {steps && steps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <SafeIcon icon={FiBook} className="text-indigo-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Solution Steps</h3>
          </div>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tips and Tricks */}
      {tips && tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <SafeIcon icon={FiLightbulb} className="text-yellow-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Tips & Tricks</h3>
          </div>
          
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-3 p-3 bg-yellow-50 rounded-lg"
              >
                <SafeIcon icon={FiTarget} className="text-yellow-600 text-lg mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Detailed Explanation */}
      {explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <SafeIcon icon={FiBook} className="text-purple-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Detailed Explanation</h3>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {explanation.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-3">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SolutionDisplay;