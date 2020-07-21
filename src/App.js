import React, { useState } from 'react';
import './App.css';
import Board from './lib/Board';
import Piece from './lib/Piece';
import Cell from './lib/Cell';
import _ from "lodash";

const App = () => {
  const xMax = 10;
  const yMax = 14;
  const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
  const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();
  const myBoard = new Board(new Piece([new Cell(3, 4), new Cell(3, 5), new Cell(4, 5)]), 
    [new Cell(6, 1), new Cell(7, 1), new Cell(7, 2)], xMax, yMax);

  const [board, setBoard] = useState(_.cloneDeep(myBoard));

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
    <button onClick={() => console.log(myBoard.currPiece)}>click</button>
    <button onClick={() => {
      console.log(myBoard.currPiece)
      setTimeout(() => {
        myBoard.moveCurrPiece("down");
      }, 5000)
      // myBoard.moveCurrPiece("down");
      // setBoard(_.cloneDeep(myBoard));
    }}>moveDown</button>
  </>
}

export default App;
