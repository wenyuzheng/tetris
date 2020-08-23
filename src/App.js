import React, { useState, useEffect } from 'react';
import './App.css';
import _ from "lodash";
import Board from './lib/lib/Board';
import generatePiece from './lib/lib/generatePiece';
import Buttons from './Components/Buttons';
import GameOverWindow from './Containers/GameOverWindow';
import StartPage from './Containers/StartPage';
import Grid from './Containers/Grid';
import NextPieceGrid from './Components/NextPieceGrid';
import styled from 'styled-components';
import useWindowSize from './hooks/useWindowSize';
import PausePage from './Containers/PausePage';

const AppContainer = styled.div`
  width: ${props => props.appWidth}px;
  height: ${props => props.appHeight}px;
  margin: 0px auto;
  box-sizing: border-box;
  // background-color: red;
`

const DisplayContainer = styled.div`
  width: ${props => props.displayWidth}px;
  height: ${props => props.displayHeight}px;
  padding: 10px;
  box-sizing: border-box;
  // background-color: green;
`
const InfoPanelContainer = styled.div`
  width: ${props => props.infoPanelWidth}px;
  height: ${props => props.infoPanelHeight}px;
  box-sizing: border-box;
  padding: 15px;
  float: left;
  // background-color: yellow;
`

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
  const [pressed, setPressed] = useState("");
  const [displayPausePage, setDisplayPausePage] = useState(false);

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
        setLevel(1);
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
    setDisplayPausePage(false);
  }

  const [screenWidth, screenHeight] = useWindowSize();

  const appWidth = Math.min(screenWidth, 420);
  const appHeight = screenHeight;

  const displayWidth = appWidth;
  const displayHeight = appHeight * 0.55;

  const squareLength = (displayHeight - 20 - 19) / 20;

  const infoPanelWidth = displayWidth - 20 - squareLength * 10 - 9;
  const infoPanelHeight = displayHeight - 20;

  const buttonsContainerWidth = appWidth;
  const buttonsContainerHeight = appHeight - displayHeight;

  if (myBoard.currPiece) {
    return <>
      <AppContainer appWidth={appWidth} appHeight={appHeight}>

        <StartPage appWidth={appWidth} appHeight={appHeight} level={level} setLevel={setLevel} startGameHandler={startGameHandler} displayStartPage={displayStartPage} />
        
        <DisplayContainer displayWidth={displayWidth} displayHeight={displayHeight}>
          <Grid xMax={xMax} yMax={yMax} board={board} displayHeight={displayHeight}/>
          <InfoPanelContainer infoPanelWidth={infoPanelWidth} infoPanelHeight={infoPanelHeight}>
            Next: <NextPieceGrid board={board} />
            <div style={{ margin: "20px 0" }}>Level: {level}</div>
            <div style={{ margin: "20px 0" }}>Score: {totalRemovedRows}</div>
            <div style={{ margin: "20px 0", height: "200px", width: "150px", border: "1px solid red", overflow: "scroll" }}>{pressed}</div>
          </InfoPanelContainer>
        </DisplayContainer>
        
        <Buttons displayPausePage={displayPausePage} setDisplayPausePage={setDisplayPausePage} setPressed={setPressed} 
          myBoard={myBoard} setBoard={setBoard} setPauseGame={setPauseGame} pauseGame={pauseGame} 
          buttonsContainerWidth={buttonsContainerWidth} buttonsContainerHeight={buttonsContainerHeight}/>
        
        {displayPausePage ? <PausePage myBoard={myBoard} setBoard={setBoard} setDisplayPausePage={setDisplayPausePage} setPauseGame={setPauseGame} setDisplayStartPage={setDisplayStartPage}/> : null}
        
        <GameOverWindow setEndOfGame={setEndOfGame} endOfGame={endOfGame} totalRemovedRows={totalRemovedRows} setDisplayStartPage={setDisplayStartPage} />
      </AppContainer>
    </>
  } else {
    return <>Loading...</>
  }
}

export default App;
