import React, { useState } from 'react';
import "./../css/pages/Sudoku.css";
import { Button, IconButton } from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ShuffleIcon from "@material-ui/icons/Shuffle";

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
  const [showPopup, setShowPopup] = useState(false);

  const generatePuzzle = () => {
    const newBoard = generateEmptyBoard();
    setBoard(fillBoard(newBoard));
    setShowPopup(false);
  };

  const solvePuzzle = () => {
    const solvedBoard = JSON.parse(JSON.stringify(board));
    setBoard(solveSudoku(solvedBoard));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  return (
    <div className="main">
      <div>
        <h2
          style={{
            fontWeight: "700",
            padding: "2px",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#101820FF",
            background: "#fff",
            width: "20%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "3px",
          }}
        >
          Sudoku Solver
          <hr
            style={{ width: "200px", border: "none", height: "1px" }}
            color="#e7e7e7"
          />
        </h2>
      </div>
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
      <div className="sudoku-buttons">
        <Button
          size="medium"
          variant="contained"
          startIcon={<EqualizerIcon />}
          color="secondary"
          onClick={generatePuzzle}
          style={{ marginRight: '10px', marginTop: '10px' }}
        >
          Generate Puzzle
        </Button>
        <Button
          size="medium"
          variant="contained"
          startIcon={<ShuffleIcon style={{ color: 'white' }} />}
          color="primary"
          onClick={solvePuzzle}
          style={{ marginTop: '10px' }}
        >
          Solve Puzzle
        </Button>
      </div>
      {showPopup && (
        <div className="popup">
          Puzzle Solved!
        </div>
      )}
    </div>
  );
};

export default Sudoku;
