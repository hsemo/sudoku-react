import { useState } from 'react'

function makeValid(str){
  // removing non-digit chars
  let newStr = str.replace(/[^1-9]/g, '');
  newStr = newStr.substr(newStr.length-1, newStr.length);
  return newStr;
}

function Board({boardData, handleBoardData, isUserWon}) {

  const handleChange = (e, row, col) => {
    const newBoardData = boardData.map((r) => r.map((c) => ({...c})));
    newBoardData[row][col].value = makeValid(e.target.value);
    handleBoardData(newBoardData);
  };

  return (
    <div className="board">
      {
        boardData.map((rowItems, row) => {
          return <div className={
            "board-row"
              + ((row === 2 || row === 5) ? " row-border-bottom" : "")
              + (isUserWon ? " winner" : "")
          }>
            {
              rowItems.map((colItem, col) => {
                return (
                  <input
                    className={
                      "btn"
                        + (colItem.readOnly ? " read-only" : "")
                        + ((col === 2 || col === 5) ? " col-border-right" : "")
                        + (isUserWon ? " winner" : "")
                    }
                    value={colItem.value}
                    readOnly={colItem.readOnly}
                    size="1"
                    onChange={(e) => handleChange(e, row, col)}
                  />
                );
              })
            }
          </div>
        })
      }
    </div>
  );
}

export default Board;
