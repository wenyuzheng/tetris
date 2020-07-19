import React, { useState } from 'react';
import './App.css';
import Board from './lib/Board';
import Piece from './lib/Piece';
import Cell from './lib/Cell';
import _ from "lodash";

const App = () => {
  const xMax = 10;
  const yMax = 14;
  const xIndices = Array.from(Array(10), (_, i) => i + 1);
  const yIndices = Array.from(Array(14), (_, i) => i + 1);
  const myBoard = new Board(new Piece([new Cell(3, 4), new Cell(3, 5), new Cell(4, 5)]), 
    [new Cell(9, 13), new Cell(10, 9), new Cell(10, 10)], 10, 14)

  const [board, setBoard] = useState(myBoard);

  return <>
    <div className="App">
      {xIndices.map((i) => {
        return yIndices.map((j) => {
          let x = i;
          let y = j;
          if (board.onBoard(x, y)) {
            return <div style={{ backgroundColor: "red" }}>{x}-{y}</div>
          }
          if (board.currPiece.onPiece(x, y)) {
            return <div style={{ backgroundColor: "green" }}>{x}-{y}</div>
          }
          return <div style={{backgroundColor: "grey"}}>{x}-{y}</div>
        })
      })}
    </div>
    <button onClick={() => {
      myBoard.moveCurrPiece("down");
      setBoard(_.cloneDeep(myBoard));
    }}>moveDown</button>
  </>
}

export default App;
