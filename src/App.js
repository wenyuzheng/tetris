import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './lib/Board';
import _ from "lodash";
import generatePiece from './lib/generatePiece';
import MusicPlayer from './lib/MusicPlayer';

const xMax = 10;
const yMax = 14;
const myBoard = new Board(generatePiece(xMax, yMax),[], xMax, yMax);

const App = ({ doFinalCheck, setDoFinalCheck, timerStarted, setTimerStarted}) => {

  const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
  const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();

  const [board, setBoard] = useState(_.cloneDeep(myBoard));
  const [endOfGame, setEndOfGame] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);

  useEffect(() => {
    if (!pauseGame) {
      setInterval(() => {
        myBoard.moveCurrPiece("down");
        setBoard(_.cloneDeep(myBoard));
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (!endOfGame && !timerStarted && myBoard.isPieceAtBottom() && !doFinalCheck) {
      setTimerStarted(true);
    }
    setDoFinalCheck(false);
  }, [board, setTimerStarted, doFinalCheck])

  useEffect(() => {
    for (let i = 0; i < myBoard.boardCells.length; i++) {
      if (myBoard.boardCells[i].y >= yMax) {
        setEndOfGame(true);
      }
    }
    if(doFinalCheck) {
      if (!endOfGame && myBoard.isPieceAtBottom()) {
        myBoard.boardCells.push(...myBoard.currPiece.pieceCells);
        myBoard.removeFullRows();
        myBoard.currPiece = generatePiece(xMax, yMax);
        setBoard(_.cloneDeep(myBoard));
        setDoFinalCheck(false);
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
            const color = board.getCellAt(x, y).color;
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
    <MusicPlayer />
    <button onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</button>
  </>
}

export default App;
