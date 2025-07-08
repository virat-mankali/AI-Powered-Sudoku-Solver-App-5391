import React from 'react';
import { motion } from 'framer-motion';

const SudokuGrid = ({ grid, onCellChange, solution }) => {
  const getCellClassName = (row, col) => {
    const baseClass = "w-full h-12 text-center text-lg font-bold border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md";
    
    // Add thick borders for 3x3 box separation with rounded corners
    let borderClass = "border-gray-300";
    if (row % 3 === 0 && row !== 0) borderClass += " border-t-4 border-t-gray-700";
    if (col % 3 === 0 && col !== 0) borderClass += " border-l-4 border-l-gray-700";
    if (row === 8) borderClass += " border-b-4 border-b-gray-700";
    if (col === 8) borderClass += " border-r-4 border-r-gray-700";
    
    // Enhanced color scheme based on whether it's user input or solution
    const isUserInput = grid[row][col] !== '';
    const isSolution = solution && solution.solvedGrid && solution.solvedGrid[row][col] !== grid[row][col];
    
    let colorClass = "bg-gradient-to-br from-white to-gray-50 text-gray-800 hover:from-blue-50 hover:to-blue-100";
    if (isUserInput) {
      colorClass = "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900 hover:from-blue-200 hover:to-blue-300";
    } else if (isSolution) {
      colorClass = "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-900 hover:from-emerald-200 hover:to-emerald-300";
    }
    
    return `${baseClass} ${borderClass} ${colorClass}`;
  };

  const displayValue = (row, col) => {
    if (grid[row][col]) return grid[row][col];
    if (solution && solution.solvedGrid) return solution.solvedGrid[row][col];
    return '';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Sudoku Puzzle
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-9 gap-1 bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-2xl shadow-2xl max-w-lg mx-auto">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square relative"
              >
                <input
                  type="text"
                  value={displayValue(rowIndex, colIndex)}
                  onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                  className={getCellClassName(rowIndex, colIndex)}
                  maxLength="1"
                  inputMode="numeric"
                  pattern="[1-9]"
                  disabled={solution && solution.solvedGrid && solution.solvedGrid[rowIndex][colIndex] !== grid[rowIndex][colIndex]}
                />
              </motion.div>
            ))
          )}
        </div>
        
        {/* Decorative corner elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-60"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full opacity-60"></div>
      </div>

      <div className="mt-6 text-center text-sm">
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 rounded-md shadow-sm"></div>
            <span className="text-gray-600 font-medium">Your input</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-md shadow-sm"></div>
            <span className="text-gray-600 font-medium">AI solution</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SudokuGrid;