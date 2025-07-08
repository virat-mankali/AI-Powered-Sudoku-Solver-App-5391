import React from 'react';
import { motion } from 'framer-motion';

const SudokuGrid = ({ grid, onCellChange, solution }) => {
  const getCellClassName = (row, col) => {
    const baseClass = "w-full h-12 text-center text-lg font-semibold border-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500";
    
    // Add thick borders for 3x3 box separation
    let borderClass = "border-gray-300";
    if (row % 3 === 0 && row !== 0) borderClass += " border-t-gray-800";
    if (col % 3 === 0 && col !== 0) borderClass += " border-l-gray-800";
    if (row === 8) borderClass += " border-b-gray-800";
    if (col === 8) borderClass += " border-r-gray-800";
    
    // Color based on whether it's user input or solution
    const isUserInput = grid[row][col] !== '';
    const isSolution = solution && solution.solvedGrid && solution.solvedGrid[row][col] !== grid[row][col];
    
    let colorClass = "bg-white text-gray-800";
    if (isUserInput) {
      colorClass = "bg-blue-50 text-blue-800";
    } else if (isSolution) {
      colorClass = "bg-green-50 text-green-800";
    }
    
    return `${baseClass} ${borderClass} ${colorClass}`;
  };

  const displayValue = (row, col) => {
    if (grid[row][col]) return grid[row][col];
    if (solution && solution.solvedGrid) return solution.solvedGrid[row][col];
    return '';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Sudoku Puzzle
      </h2>
      
      <div className="grid grid-cols-9 gap-1 bg-gray-800 p-2 rounded-lg max-w-md mx-auto">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square"
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
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
            <span>Your input</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
            <span>AI solution</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudokuGrid;