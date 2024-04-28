import { useState, useEffect } from 'react';
import Board from './Board.jsx';
import {useBoardGenerator} from './customHooks.jsx';
import './App.css'


function isSolved(solvedBoardData, newBoardData){
  let solvedBoardDataString = '' + solvedBoardData.map(
    (row) => row.map(
      (col) => col.value
    )
  );

  let newBoardDataString = '' + newBoardData.map(
    (row) => row.map(
      (col) => col.value
    )
  );

  return solvedBoardDataString === newBoardDataString;
}


function App() {
  const [dificultyLevel, setDificultyLevel] = useState("easy");
  const [boardData, setBoardData, solvedBoardData, generateNewBoard] = useBoardGenerator(dificultyLevel);
  const [isUserWon, setIsUserWon] = useState(false);

  const handleBoardData = (newBoardData) => {
    if(isSolved(solvedBoardData, newBoardData)){
      setIsUserWon(true);
      setBoardData(newBoardData);
      return;
    }
    setIsUserWon(false);
    setBoardData(newBoardData);
  };

  const generateNewBoardWrapper = () => {
    setIsUserWon(false);
    generateNewBoard();
  };

  const solveBoard = () => {
    setBoardData(
      solvedBoardData
        .map(
          (row) => row.map(
            (col) => { // parenthisis because of {} braces
              return {...col};
            }
          )
        )
    );
    setIsUserWon(true);
  };

  const handleDifficultyChange = (event) => {
    setDificultyLevel(event.target.value);
  };

  return (
    <>
      {
        isUserWon
          ? <h3 style={{color: "#5f5"}}>You Have Won.</h3>
          : ''
      }

      <div className="menu">
        <select name="difficulty" id="diff" onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="very-hard">Very Hard</option>
          <option value="insane">Insane</option>
          <option value="inhuman">Inhuman</option>
        </select>

        <button
          className="menu-btn"
          onClick={() => generateNewBoard()}
        >
          Generate new board
        </button>

        <button
          className="menu-btn"
          onClick={solveBoard}
        >
          Solve Board
        </button>
      </div>

      <Board
        boardData={boardData}
        handleBoardData={handleBoardData}
        isUserWon={isUserWon}
      />
    </>
  );
}

export default App;
