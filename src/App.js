import React, { useState, useEffect } from 'react';
import './App.css';
import _ from "lodash";
import Board from './lib/Board';
import generatePiece from './lib/generatePiece';
import Buttons from './lib/Buttons';
import GameOverWindow from './lib/GameOverWindow';
import StartPage from './lib/StartPage';
import Grid from './lib/Grid';
import LeaderBoard from './lib/LeaderBoard';

const xMax = 10;
const yMax = 14;
const myBoard = new Board(null, [], generatePiece(xMax, yMax), xMax, yMax);

const App = ({ setDelay, doFinalCheck, setDoFinalCheck, timerStarted, setTimerStarted }) => {

  const [board, setBoard] = useState(_.cloneDeep(myBoard));
  const [endOfGame, setEndOfGame] = useState(false);
  const [pauseGame, setPauseGame] = useState(true);
  const [totalRemovedRows, setTotalRemovedRows] = useState(0);
  const [displayStartPage, setDisplayStartPage] = useState(true);
  const [dropSpeed, setDropSpeed] = useState(1000);

  const currToNextPieceHandler = () => {
    myBoard.currPiece = myBoard.nextPiece;
    myBoard.nextPiece = generatePiece(xMax, yMax);
    setBoard(_.cloneDeep(myBoard));
  }

  useEffect(() => {
    currToNextPieceHandler();
  }, [])

  useEffect(() => {
    if (!pauseGame) {
      const autoDown = setInterval(() => {
        myBoard.moveCurrPiece("down");
        setBoard(_.cloneDeep(myBoard));
      }, dropSpeed)
      return () => clearInterval(autoDown)
    }
  }, [pauseGame])

  useEffect(() => {
    for (let i = 0; i < myBoard.boardCells.length; i++) {
      if (myBoard.boardCells[i].y >= yMax) {
        setEndOfGame(true);
        setPauseGame(true);
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
        currToNextPieceHandler();
        setDoFinalCheck(false);
      }
    }
  }, [doFinalCheck])

  useEffect(() => {
    if (totalRemovedRows >= 5) {
      setDelay(1500);
      setDropSpeed(500);
    } else if (totalRemovedRows >= 10) {
      setDelay(800);
      setDropSpeed(300);
    } else {
      setDelay(2000);
      setDropSpeed(1000);
    }
  }, [totalRemovedRows])

  const startGameHandler = () => {
    myBoard.boardCells = [];
    setBoard(_.cloneDeep(myBoard));
    setEndOfGame(false);
    setDisplayStartPage(false); 
    setPauseGame(false);
  }

  if(myBoard.currPiece) {
    return <>
      <StartPage startGameHandler={startGameHandler} displayStartPage={displayStartPage}/> 
      <Grid xMax={xMax} yMax={yMax} board={board}/>
      <Buttons myBoard={myBoard} setBoard={setBoard} setPauseGame={setPauseGame} pauseGame={pauseGame}/>
      <div>Lines: {totalRemovedRows}</div>
      <GameOverWindow endOfGame={endOfGame} totalRemovedRows={totalRemovedRows} setDisplayStartPage={setDisplayStartPage}/>
      <LeaderBoard />
    </>
  } else {
    return <>Loading...</>
  }
}

export default App;
