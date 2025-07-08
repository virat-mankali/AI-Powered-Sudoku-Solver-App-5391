import OpenAI from 'openai';

export const solveSudokuWithAI = async (grid, apiKey) => {
  try {
    const openai = new OpenAI({ 
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Allows API key usage in browser
    });

    // Convert grid to string format for AI
    const gridString = grid.map(row => 
      row.map(cell => cell === '' ? '0' : cell).join('')
    ).join('\n');

    const prompt = `
You are an expert Sudoku solver. I will provide you with a Sudoku puzzle where empty cells are represented by 0 and filled cells contain numbers 1-9.

Here's the puzzle:
${gridString}

Please solve this Sudoku puzzle and provide:

1. The complete solved grid
2. A step-by-step explanation of how you solved it (maximum 5-7 key steps)
3. 3-4 practical tips and tricks that a beginner can use to solve similar puzzles
4. A detailed explanation of the main solving techniques used

Format your response as a JSON object with this structure:
{
  "solved": true/false,
  "solvedGrid": [9x9 array of numbers],
  "steps": ["step1", "step2", ...],
  "tips": ["tip1", "tip2", ...],
  "explanation": "detailed explanation of techniques used"
}

Make sure the explanation is easy to understand for someone learning Sudoku. Focus on practical techniques like:
- Looking for naked singles (cells with only one possible number)
- Hidden singles (numbers that can only go in one cell in a row/column/box)
- Elimination techniques
- Box/line reduction
- Pattern recognition

Keep the language simple and encouraging, as this is for someone who enjoys solving puzzles manually.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert Sudoku solver assistant that provides clear, step-by-step solutions and helpful tips."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      response_format: { type: "json_object" }
    });

    // Extract JSON from the response
    const text = response.choices[0].message.content;
    const parsedResponse = JSON.parse(text);

    if (!parsedResponse.solved) {
      throw new Error('The puzzle could not be solved. Please check if all numbers are entered correctly.');
    }

    // Validate the solved grid
    if (!parsedResponse.solvedGrid || !Array.isArray(parsedResponse.solvedGrid) || parsedResponse.solvedGrid.length !== 9) {
      throw new Error('Invalid solved grid format');
    }

    return {
      solvedGrid: parsedResponse.solvedGrid,
      steps: parsedResponse.steps || [],
      tips: parsedResponse.tips || [],
      explanation: parsedResponse.explanation || ''
    };

  } catch (error) {
    console.error('Error solving Sudoku:', error);
    
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your OpenAI API key.');
    } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.message?.includes('JSON')) {
      throw new Error('Error parsing AI response. Please try again.');
    } else {
      throw new Error(error.message || 'Failed to solve puzzle. Please try again.');
    }
  }
};

// Utility function to validate Sudoku grid
export const validateSudokuGrid = (grid) => {
  // Check if grid is 9x9
  if (grid.length !== 9 || grid.some(row => row.length !== 9)) {
    return false;
  }

  // Check for valid numbers (1-9 or empty)
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell !== '' && (cell < 1 || cell > 9)) {
        return false;
      }
    }
  }

  return true;
};