import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SudokuGrid from './components/SudokuGrid';
import SolutionDisplay from './components/SolutionDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ApiKeyModal from './components/ApiKeyModal';
import { solveSudokuWithAI } from './services/openaiService';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';

const { FiBrain, FiRefreshCw, FiSettings, FiInfo } = FiIcons;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <SafeIcon icon={FiBrain} className="text-3xl text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              AI Sudoku Solver
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Enter your puzzle and let AI solve it with detailed explanations
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <button
            onClick={handleSolve}
            disabled={isLoading || isGridEmpty}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          >
            <SafeIcon icon={FiBrain} className="text-xl" />
            {isLoading ? 'Solving...' : 'Solve Puzzle'}
          </button>
          
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
          >
            <SafeIcon icon={FiRefreshCw} className="text-xl" />
            Clear
          </button>
          
          <button
            onClick={() => setShowApiModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
          >
            <SafeIcon icon={FiSettings} className="text-xl" />
            API Key
          </button>
        </motion.div>

        {/* API Key Info */}
        {!apiKey && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <SafeIcon icon={FiInfo} className="text-yellow-600 text-xl mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  OpenAI API Key Required
                </h3>
                <p className="text-yellow-700 text-sm">
                  You need an OpenAI API key to use the AI solver. 
                  Get your API key from OpenAI and click "API Key" to configure it.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sudoku Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SudokuGrid
              grid={grid}
              onCellChange={handleCellChange}
              solution={solution}
            />
          </motion.div>

          {/* Solution Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="solution"
                >
                  <SolutionDisplay solution={solution} />
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