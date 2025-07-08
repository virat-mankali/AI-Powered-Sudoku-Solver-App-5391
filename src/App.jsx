import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SudokuGrid from './components/SudokuGrid';
import SolutionDisplay from './components/SolutionDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ApiKeyModal from './components/ApiKeyModal';
import { solveSudokuWithAI } from './services/openaiService';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';

const { FiBrain, FiRefreshCw, FiSettings, FiInfo, FiStar, FiZap } = FiIcons;

function App() {
  const [grid, setGrid] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleCellChange = (row, col, value) => {
    if (value === '' || (/^[1-9]$/.test(value))) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = value;
      setGrid(newGrid);
      setSolution(null);
      setError('');
    }
  };

  const handleSolve = async () => {
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setSolution(null);

    try {
      const result = await solveSudokuWithAI(grid, apiKey);
      setSolution(result);
    } catch (err) {
      setError(err.message || 'Failed to solve the puzzle. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill('')));
    setSolution(null);
    setError('');
  };

  const handleApiKeySave = (key) => {
    setApiKey(key);
    localStorage.setItem('openai-api-key', key);
    setShowApiModal(false);
  };

  const isGridEmpty = grid.every(row => row.every(cell => cell === ''));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-br from-pink-200 to-red-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <SafeIcon icon={FiBrain} className="text-5xl text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
              <div className="absolute inset-0 text-5xl text-blue-600 opacity-20">
                <SafeIcon icon={FiBrain} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                AI Sudoku Solver
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <SafeIcon icon={FiZap} className="text-yellow-500" />
                <span>Powered by GPT-4o Mini</span>
                <SafeIcon icon={FiStar} className="text-yellow-500" />
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
            Enter your puzzle and let our advanced AI solve it with detailed explanations and helpful tips
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSolve}
            disabled={isLoading || isGridEmpty}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg"
          >
            <SafeIcon icon={FiBrain} className="text-xl" />
            {isLoading ? 'Solving...' : 'Solve Puzzle'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-lg font-semibold shadow-lg"
          >
            <SafeIcon icon={FiRefreshCw} className="text-xl" />
            Clear
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowApiModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 text-lg font-semibold shadow-lg"
          >
            <SafeIcon icon={FiSettings} className="text-xl" />
            API Key
          </motion.button>
        </motion.div>

        {/* API Key Info */}
        <AnimatePresence>
          {!apiKey && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-8 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <SafeIcon icon={FiInfo} className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2 text-lg">
                    OpenAI API Key Required
                  </h3>
                  <p className="text-yellow-700">
                    You need an OpenAI API key to use the AI solver. 
                    Get your API key from OpenAI and click "API Key" to configure it.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 mb-8 shadow-lg"
            >
              <p className="text-red-700 font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid xl:grid-cols-2 gap-12">
          {/* Sudoku Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <SudokuGrid
              grid={grid}
              onCellChange={handleCellChange}
              solution={solution}
            />
          </motion.div>

          {/* Solution Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="loading"
                >
                  <LoadingSpinner />
                </motion.div>
              )}
              
              {solution && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  key="solution"
                >
                  <SolutionDisplay solution={solution} />
                </motion.div>
              )}
              
              {!isLoading && !solution && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center shadow-lg"
                >
                  <div className="text-6xl mb-4">🧩</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Ready to Solve!
                  </h3>
                  <p className="text-gray-600">
                    Enter your Sudoku puzzle numbers and click "Solve Puzzle" to get started.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={showApiModal}
          onClose={() => setShowApiModal(false)}
          onSave={handleApiKeySave}
          currentKey={apiKey}
        />
      </div>
    </div>
  );
}

export default App;