import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './lib/Board';
import _ from "lodash";
import generatePiece from './lib/generatePiece';

const xMax = 10;
const yMax = 14;
const myBoard = new Board(generatePiece(xMax, yMax),
  [], 
  xMax, yMax);

const App = ({ doFinalCheck, setDoFinalCheck, timerStarted, setTimerStarted}) => {
  // console.log("rerender App");

  const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
  const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();

  const [board, setBoard] = useState(_.cloneDeep(myBoard));
  const [endOfGame, setEndOfGame] = useState(false);

  const moveDownHandler = () => {
    myBoard.moveCurrPiece("down");
    setBoard(_.cloneDeep(myBoard));
  }

  // useEffect(() => {
  //   for (let i = 0; i < myBoard.boardCells.length; i++) {
  //     if (myBoard.boardCells[i].y >= yMax) {
  //       setEndOfGame(true);
  //     }
  //   }
  //   if (!endOfGame && myBoard.isPieceAtBottom()) {
  //     myBoard.boardCells.push(...myBoard.currPiece.pieceCells);
  //     myBoard.currPiece = generatePiece(xMax, yMax);
  //     setBoard(_.cloneDeep(myBoard));
  //   } 
  // }, [board])

  // useEffect(() => {
  //   setTimeout(() => {
  //     moveDownHandler()
  //   }, 1000)
  // }, [moveDownHandler])

  useEffect(() => {
    console.log("check 1", timerStarted, doFinalCheck)
    if (!timerStarted && myBoard.isPieceAtBottom() && !doFinalCheck) {
      setTimerStarted(true);
    }
  }, [board, timerStarted, setTimerStarted, doFinalCheck])

  useEffect(() => {
    if(doFinalCheck) {
      if (myBoard.isPieceAtBottom()) {
        myBoard.boardCells.push(...myBoard.currPiece.pieceCells);
        myBoard.currPiece = generatePiece(xMax, yMax);
        setDoFinalCheck(false);
        setTimeout(() => {
          setBoard(_.cloneDeep(myBoard));
        }, 100)
        
        
      }
    }
  }, [doFinalCheck])

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
      moveDownHandler();
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
