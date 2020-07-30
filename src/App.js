import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './lib/Board';
import _ from "lodash";
import generatePiece from './lib/generatePiece';
import Buttons from './lib/Buttons';

const xMax = 10;
const yMax = 14;
const myBoard = new Board(generatePiece(xMax, yMax),[], xMax, yMax);

const App = ({ doFinalCheck, setDoFinalCheck, timerStarted, setTimerStarted}) => {

  const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
  const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();

  const [board, setBoard] = useState(_.cloneDeep(myBoard));
  const [endOfGame, setEndOfGame] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);
  const [totalRemovedRows, setTotalRemovedRows] = useState(0);

  useEffect(() => {
    if (!pauseGame) {
      const autoDown = setInterval(() => {
        myBoard.moveCurrPiece("down");
        setBoard(_.cloneDeep(myBoard));
      }, 1000)
      return () => clearInterval(autoDown)
    }
  }, [pauseGame])

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
        setTotalRemovedRows(totalRemovedRows + myBoard.removeFullRows());
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
    <Buttons myBoard={myBoard} setBoard={setBoard} setPauseGame={setPauseGame} pauseGame={pauseGame}/>
    <div>Lines: {totalRemovedRows}</div>
  </>
}

export default App;
