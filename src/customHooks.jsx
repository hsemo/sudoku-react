import {useState, useEffect} from 'react';
import {init} from './sudoku.jsx';

const sudoku = init();

const useBoardGenerator = function(dificultyLevel){
  const [boardData, setBoardData] = useState(Array(9).fill(0).map(() => Array(9).fill(0).map(() => Math.floor(Math.random()*9))));
  const [solvedBoardData, setSolvedBoardData] = useState(false);

  const generateNewBoard = () => {
    let board = sudoku.generate(dificultyLevel);
    let solvedBoard = sudoku.board_string_to_grid(sudoku.solve(board))

    board = sudoku
      .board_string_to_grid(board)
      .map(
        (row) => row.map(
          (col) => (
            {
              value: col === '.' ? ' ' : col,
              readOnly: col !== '.'
            }
          )
        )
      );

    solvedBoard =
      board.map(
        (row, rowIndex) => row.map(
          (col, colIndex) => (
            {
              value: col.value === ' ' ? solvedBoard[rowIndex][colIndex] : col.value,
              readOnly: col.readOnly
            }
          )
        )
      );

    setBoardData(board);

    setSolvedBoardData(solvedBoard);
    // setSolvedBoardData(solvedBoard);
  };

  useEffect(() => {
    let board = sudoku.generate(dificultyLevel);
    let solvedBoard = sudoku.board_string_to_grid(sudoku.solve(board))

    board = sudoku
      .board_string_to_grid(board)
      .map(
        (row) => row.map(
          (col) => (
            {
              value: col === '.' ? ' ' : col,
              readOnly: col !== '.'
            }
          )
        )
      );

    solvedBoard =
      board.map(
        (row, rowIndex) => row.map(
          (col, colIndex) => (
            {
              value: col.value === ' ' ? solvedBoard[rowIndex][colIndex] : col.value,
              readOnly: col.readOnly
            }
          )
        )
      );

    setBoardData(board);

    setSolvedBoardData(solvedBoard);
    // setSolvedBoardData(solvedBoard);
  }, []);

  return [boardData, setBoardData, solvedBoardData, generateNewBoard];
};

const useIsSolved = function(){

};

export {useBoardGenerator, useIsSolved};
