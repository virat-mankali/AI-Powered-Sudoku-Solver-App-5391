import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiKey, FiExternalLink, FiEye, FiEyeOff } = FiIcons;

const ApiKeyModal = ({ isOpen, onClose, onSave, currentKey }) => {
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <SafeIcon icon={FiKey} className="text-green-600 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  OpenAI API Key
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your OpenAI API key"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-500 pr-12 text-lg transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <SafeIcon icon={showKey ? FiEyeOff : FiEye} className="text-lg" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-3 text-lg">
                  How to get your API key:
                </h3>
                <ol className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">1.</span>
                    <span>Visit OpenAI's website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">2.</span>
                    <span>Sign in to your OpenAI account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">3.</span>
                    <span>Go to API keys section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">4.</span>
                    <span>Create a new secret key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">5.</span>
                    <span>Copy and paste it here</span>
                  </li>
                </ol>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  <SafeIcon icon={FiExternalLink} className="text-sm" />
                  Get API Key
                </motion.a>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                🔒 Your API key is stored locally in your browser and never shared with third parties.
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg"
              >
                Save Key
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApiKeyModal;