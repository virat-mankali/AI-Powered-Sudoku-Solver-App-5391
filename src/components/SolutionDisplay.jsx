import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiBook, FiLightbulb, FiTarget } = FiIcons;

const SolutionDisplay = ({ solution }) => {
  if (!solution) return null;

  const { steps, tips, explanation } = solution;

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-full">
            <SafeIcon icon={FiCheckCircle} className="text-emerald-600 text-2xl" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 text-xl">Puzzle Solved!</h3>
            <p className="text-emerald-700">
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
          className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <SafeIcon icon={FiBook} className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Solution Steps</h3>
          </div>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{step}</p>
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
          className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-xl p-8 border border-yellow-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-100 rounded-full">
              <SafeIcon icon={FiLightbulb} className="text-yellow-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Tips & Tricks</h3>
          </div>
          
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100"
              >
                <SafeIcon icon={FiTarget} className="text-yellow-600 text-lg mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed font-medium">{tip}</p>
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
          className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-8 border border-purple-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <SafeIcon icon={FiBook} className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Detailed Explanation</h3>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {explanation.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 font-medium">
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