import React, { useState } from 'react';
import "./../css/pages/Sudoku.css";
const generateEmptyBoard = () => {
  return Array(9).fill().map(() => Array(9).fill(0));
};

const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};

const fillBoard = (board) => {
  const randomize = () => Math.floor(Math.random() * 9) + 1;
  let count = 0;

  while (count < 17) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const num = randomize();

    if (board[row][col] === 0 && isValid(board, row, col, num)) {
      board[row][col] = num;
      count++;
    }
  }

  return board;
};

const solveSudoku = (board) => {
  const findEmpty = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  };

  const solve = (board) => {
    const emptySpot = findEmpty(board);
    if (!emptySpot) {
      return true;
    }

    const [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;

        if (solve(board)) {
          return true;
        }

        board[row][col] = 0;
      }
    }

    return false;
  };

  solve(board);
  return board;
};

const Sudoku = () => {
  const [board, setBoard] = useState(generateEmptyBoard());

  const generatePuzzle = () => {
    const newBoard = generateEmptyBoard();
    setBoard(fillBoard(newBoard));
  };

  const solvePuzzle = () => {
    const solvedBoard = JSON.parse(JSON.stringify(board));
    setBoard(solveSudoku(solvedBoard));
  };

  return (
    <div>
      <h1>Sudoku</h1>
      <div className="sudoku-board">
      
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, cellIndex) => (
              <input
                key={cellIndex}
                className="sudoku-cell"
                type="text"
                value={cell === 0 ? '' : cell}
                readOnly
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={generatePuzzle}>Generate Puzzle</button>
      <button onClick={solvePuzzle}>Solve Puzzle</button>
    </div>
  );
};

export default Sudoku;
