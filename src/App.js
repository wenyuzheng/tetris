import React, { useState, useEffect } from 'react';
import './App.css';
import _ from "lodash";
import Board from './lib/Board';
import generatePiece from './lib/generatePiece';
import Buttons from './lib/Buttons';
import GameOverWindow from './lib/GameOverWindow';
import StartPage from './lib/StartPage';
import Grid from './lib/Grid';

const xMax = 10;
const yMax = 14;
const myBoard = new Board(generatePiece(xMax, yMax),[], xMax, yMax);

const App = ({ doFinalCheck, setDoFinalCheck, timerStarted, setTimerStarted }) => {

  const [board, setBoard] = useState(_.cloneDeep(myBoard));
  const [endOfGame, setEndOfGame] = useState(false);
  const [pauseGame, setPauseGame] = useState(true);
  const [totalRemovedRows, setTotalRemovedRows] = useState(0);
  const [displayStartPage, setDisplayStartPage] = useState(true);

  // useEffect(() => {
  //   firebase.database().ref(`/tetris/${userName}/score`).once('value').then(data => {
  //     if (data.val() === null) {
  //       setTotalRemovedRows(0);
  //     } else {
  //       setTotalRemovedRows(data.val().score);
  //     }
  //   })
  // }, [])

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
    for (let i = 0; i < myBoard.boardCells.length; i++) {
      if (myBoard.boardCells[i].y >= yMax) {
        setEndOfGame(true);
      }
    }
  }, [board])

  useEffect(() => {
    if (!endOfGame && !timerStarted && myBoard.isPieceAtBottom() && !doFinalCheck) {
      setTimerStarted(true);
    }
    setDoFinalCheck(false);
  }, [board, setTimerStarted, doFinalCheck])

  useEffect(() => {
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
    <StartPage setDisplayStartPage={setDisplayStartPage} displayStartPage={displayStartPage} setPauseGame={setPauseGame}/> 
    <Grid xMax={xMax} yMax={yMax} board={board}/>
    <Buttons myBoard={myBoard} setBoard={setBoard} setPauseGame={setPauseGame} pauseGame={pauseGame}/>
    <div>Lines: {totalRemovedRows}</div>
    <GameOverWindow endOfGame={endOfGame} totalRemovedRows={totalRemovedRows} setDisplayStartPage={setDisplayStartPage}/>

    <button onClick={() => { setEndOfGame(!endOfGame); console.log(endOfGame)}}>click</button>
  </>
}

export default App;
