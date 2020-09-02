import React, { useState, useEffect } from 'react';
import './App.css';
import _ from "lodash";
import styled from 'styled-components';

import Board from './lib/lib/Board';
import generateRealPiece from './lib/lib/generatePiece';

import Buttons from './components/gamepage/Buttons';
import Grid from './components/gamepage/Grid';
import NextPieceGrid from './components/gamepage/NextPieceGrid';
import Loading from './components/Loading';

import GameOverWindow from './scenes/GameOverWindow';
import StartPage from './scenes/StartPage';
import PausePage from './scenes/PausePage';

import useWindowSize from './hooks/useWindowSize';

import useSound from 'use-sound';
import clearSnd from './asset/sound/clear.mp3';
import gameOverSnd from './asset/sound/gameOver.mp3';
import setLevels from './lib/lib/setLevels';
import autoDown from './lib/lib/autoDown';
// import soundOffImg from './asset/images/mute.png';
// import musicOffImg from './asset/images/musicOff.png'

const AppContainer = styled.div`
  width: ${props => props.appWidth}px;
  height: ${props => props.appHeight}px;
  margin: 0px auto;
  box-sizing: border-box;
  user-select: none;
  touch-action: manipulation;
`

const DisplayContainer = styled.div`
  width: ${props => props.displayWidth}px;
  height: ${props => props.displayHeight}px;
  padding: 10px;
  box-sizing: border-box;
`

const InfoPanelContainer = styled.div`
  width: ${props => props.infoPanelWidth}px;
  height: ${props => props.infoPanelHeight}px;
  box-sizing: border-box;
  padding: 15px;
  float: left;
`

const xMax = 10;
const yMax = 20;
const myBoard = new Board(generateRealPiece(), [], generateRealPiece(), xMax, yMax);

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
  const [playSound, setPlaySound] = useState(true);

  const [clearSound] = useSound(clearSnd);
  const [gameOverSound] = useSound(gameOverSnd);

  const currToNextPieceHandler = () => {
    myBoard.currPiece = myBoard.nextPiece;
    myBoard.nextPiece = generateRealPiece();
    setBoard(_.cloneDeep(myBoard));
  }

  useEffect(() => {
    if (playSound) {
      clearSound();
    }
  }, [totalRemovedRows, playSound])

  useEffect(() => {
    for (let i = 0; i < myBoard.boardCells.length; i++) {
      if (myBoard.boardCells[i].y >= yMax) {
        setEndOfGame(true);
        setPauseGame(true);
        setLevel(1);
        if (playSound) {
          gameOverSound();
        }
      }
    }
  }, [board, playSound])

  useEffect(() => {
    if (!endOfGame && !timerStarted && myBoard.isPieceAtBottom() && !doFinalCheck) {
      myBoard.canMoveFurther() ? setDelay(2000) : setDelay(0); //set delay to levels[level].delay if true
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

  const startGameHandler = () => {
    myBoard.boardCells = [];
    currToNextPieceHandler();
    setBoard(_.cloneDeep(myBoard));
    setDisplayStartPage(false); 
    setPauseGame(false);
  }

  setLevels(level, setLevel, setDelay, setDropSpeed, totalRemovedRows);
  autoDown(pauseGame, myBoard, setBoard, dropSpeed);

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

        {displayStartPage ? 
        <StartPage appWidth={appWidth} appHeight={appHeight} level={level} 
          setLevel={setLevel} startGameHandler={startGameHandler}/>
        : null }

        <DisplayContainer displayWidth={displayWidth} displayHeight={displayHeight}>
          <Grid xMax={xMax} yMax={yMax} board={board} displayHeight={displayHeight}/>
          <InfoPanelContainer infoPanelWidth={infoPanelWidth} infoPanelHeight={infoPanelHeight}>
            Next: <NextPieceGrid board={board} />
            <div style={{ margin: "20px 0" }}>Level: {level}</div>
            <div style={{ margin: "20px 0" }}>Score: {totalRemovedRows}</div>
            {/* <img src={musicOffImg} width="20px" height="20px"/>
            <img src={soundOffImg} width="20px" height="20px"/> */}
            {/* <div style={{ margin: "20px 0", height: "200px", width: "150px", border: "1px solid red", overflow: "scroll" }}>{pressed}</div> */}
          </InfoPanelContainer>
        </DisplayContainer>
        
        <Buttons displayPausePage={displayPausePage} setDisplayPausePage={setDisplayPausePage} 
          setPressed={setPressed} myBoard={myBoard} setBoard={setBoard} setPauseGame={setPauseGame} 
          pauseGame={pauseGame} playSound={playSound} setPlaySound={setPlaySound}
          buttonsContainerWidth={buttonsContainerWidth} buttonsContainerHeight={buttonsContainerHeight}/>
        
        {displayPausePage ? 
        <PausePage myBoard={myBoard} setBoard={setBoard} setDisplayPausePage={setDisplayPausePage} 
          setPauseGame={setPauseGame} setDisplayStartPage={setDisplayStartPage}/> 
        : null}
        
        {endOfGame ? 
        <GameOverWindow setEndOfGame={setEndOfGame} endOfGame={endOfGame} 
          totalRemovedRows={totalRemovedRows} setDisplayStartPage={setDisplayStartPage} /> 
        : null}
      </AppContainer>
    </>
  } else {
    return <Loading/>
  }
}

export default App;
