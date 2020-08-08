import React, { useState, useEffect } from 'react';
import './App.css';
import _ from "lodash";
import Board from './lib/Board/Board';
import generatePiece from './lib/generatePiece';
import Buttons from './lib/Components/Buttons';
import GameOverWindow from './lib/Containers/GameOverWindow';
import StartPage from './lib/Containers/StartPage';
import Grid from './lib/Containers/Grid';
import NextPieceGrid from './lib/Components/NextPieceGrid';

const xMax = 10;
const yMax = 20;
const myBoard = new Board(null, [], generatePiece(xMax, yMax), xMax, yMax);

const levels = {
  1: {
    delay: 2000,
    dropSpeed: 1000,
  },
  2: {
    delay: 1500,
    dropSpeed: 500,
  },
  3: {
    delay: 800,
    dropSpeed: 300,
  },
}

const App = ({ setDelay, doFinalCheck, setDoFinalCheck, timerStarted, setTimerStarted }) => {

  const [board, setBoard] = useState(_.cloneDeep(myBoard));
  const [endOfGame, setEndOfGame] = useState(false);
  const [pauseGame, setPauseGame] = useState(true);
  const [totalRemovedRows, setTotalRemovedRows] = useState(0);
  const [displayStartPage, setDisplayStartPage] = useState(true);
  const [dropSpeed, setDropSpeed] = useState(1000);
  const [level, setLevel] = useState(1);

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
    setDelay(levels[level].delay)
    setDropSpeed(levels[level].dropSpeed)
  }, [setLevel, level])

  useEffect(() => {
    if (level <= 1 && totalRemovedRows > 5) {
      setLevel(1);
    } else if (level <= 2 && totalRemovedRows >= 5 && totalRemovedRows < 10) {
      setLevel(2);
    } else if (totalRemovedRows >= 10) {
      setLevel(3);
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
      <StartPage level={level} setLevel={setLevel} startGameHandler={startGameHandler} displayStartPage={displayStartPage}/> 
      <div className="App">
        <Grid xMax={xMax} yMax={yMax} board={board} />
        <div className="ControlBox">
          <NextPieceGrid board={board} />
          <div>Lines: {totalRemovedRows}</div>
          <Buttons myBoard={myBoard} setBoard={setBoard} setPauseGame={setPauseGame} pauseGame={pauseGame} />
        </div>
      </div>
      <GameOverWindow endOfGame={endOfGame} totalRemovedRows={totalRemovedRows} setDisplayStartPage={setDisplayStartPage}/>
    </>
  } else {
    return <>Loading...</>
  }
}

export default App;
