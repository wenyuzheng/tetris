import React, { useState } from 'react';
import './App.css';
import Board from './lib/Board';
import Piece from './lib/Piece';
import Cell from './lib/Cell';
import _ from "lodash";

const randomColor = () => {
  const colors = ["red", "green", "blue", "yellow", "purple"];
  const randomNumber = Math.floor(Math.random() * 5);
  return colors[randomNumber];
}

const generateCells = () => {
  const initialCell = new Cell(5, 14, true, randomColor());
  const cell1 = new Cell(_.cloneDeep(initialCell).x -= 1, _.cloneDeep(initialCell).y, false, randomColor());
  const cell2 = new Cell(_.cloneDeep(initialCell).x += 1, _.cloneDeep(initialCell).y, false, randomColor());
  const cell3 = new Cell(_.cloneDeep(initialCell).x, _.cloneDeep(initialCell).y -= 1, false, randomColor());
  
  const centerCells = [initialCell];
  const adjCells = [cell1, cell2, cell3];

  const rand = Math.floor(Math.random() * adjCells.length);
  const newCenterCell = adjCells[rand];
  centerCells.push(newCenterCell);
  adjCells.splice(rand, 1);

  for (let i = 0; i < centerCells.length; i++) {
    if (newCenterCell.x - 1 !== centerCells[i].x) {
      adjCells.push(new Cell(_.cloneDeep(newCenterCell).x -= 1, _.cloneDeep(newCenterCell).y, false, randomColor()))
    }
    if (newCenterCell.x + 1 !== centerCells[i].x) {
      adjCells.push(new Cell(_.cloneDeep(newCenterCell).x += 1, _.cloneDeep(newCenterCell).y, false, randomColor()))
    }
    if (newCenterCell.y - 1 !== centerCells[i].y) {
      adjCells.push(new Cell(_.cloneDeep(newCenterCell).x, _.cloneDeep(newCenterCell).y -= 1, false, randomColor()))
    }
    if (newCenterCell.y + 1 !== centerCells[i].y) {
      adjCells.push(new Cell(_.cloneDeep(newCenterCell).x, _.cloneDeep(newCenterCell).y += 1, false, randomColor()))
    }
  }
}

const xMax = 10;
const yMax = 14;
const myBoard = new Board(new Piece([new Cell(3, 4, false, "blue"), new Cell(3, 5, true, "blue"), new Cell(4, 5, false, "blue")]),
  [new Cell(6, 1, false, randomColor()), new Cell(7, 1, false, randomColor()), new Cell(7, 2, false, randomColor())], 
  xMax, yMax);

const App = () => {
  const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
  const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();

  const [board, setBoard] = useState(_.cloneDeep(myBoard));

  return <>
    <div className="App">
      {xIndices.map((i) => {
        return yIndices.map((j) => {
          let x = i;
          let y = j;
          if (board.onBoard(x, y)) {
            const color = board.getCellAt(x,y).color;
            return <div key={`${x}-${y}`} style={{ backgroundColor: color }}>{x}-{y}</div>
          }
          if (board.currPiece.onPiece(x, y)) {
            const color = board.currPiece.getCellAt(x, y).color;
            return <div key={`${x}-${y}`} style={{ backgroundColor: color }}>{x}-{y}</div>
          }
          return <div key={`${x}-${y}`} style={{backgroundColor: "grey"}}>{x}-{y}</div>
        })
      })}
    </div>
    <button onClick={() => {
      myBoard.moveCurrPiece("down");
      setBoard(_.cloneDeep(myBoard));
    }}>moveDown</button>
    <button onClick={() => {
      myBoard.moveCurrPiece("left");
      setBoard(_.cloneDeep(myBoard));
    }}>moveLeft</button>
    <button onClick={() => {
      myBoard.moveCurrPiece("right");
      setBoard(_.cloneDeep(myBoard));
    }}>moveRight</button>
    <button onClick={() => {
      myBoard.rotateCurrPiece("left");
      setBoard(_.cloneDeep(myBoard));
    }}>rotateLeft</button>
    <button onClick={() => {
      myBoard.rotateCurrPiece("right");
      setBoard(_.cloneDeep(myBoard));
    }}>rotateRight</button>
  </>
}

export default App;
