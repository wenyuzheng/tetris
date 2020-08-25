import React from 'react';
import _ from 'lodash';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import '../css/Buttons.css';
import useLongPress from '../../hooks/useLongPress';
import styled from 'styled-components';

    const ButtonsContainer = styled.div`
        width: ${props => props.buttonsContainerWidth}px;
        height: ${props => props.buttonsContainerHeight}px;
    `

    const OptionButtonsContainer = styled.div`
        width: ${ props => props.optionButtonsContainerWidth}px;
        height: ${props => props.optionButtonsContainerHeight}px;
        margin: auto;
    `

    const MoveButtonsGrid = styled.div`
        width: ${props => props.moveButtonsContainerHeight}px;
        height: ${props => props.moveButtonsContainerHeight}px;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        margin: 10px auto;
    `

    const OptionButton = styled.button`
        width: ${props => props.optionButtonsWidth}px;
        height: ${props => props.optionButtonsHeight}px;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        margin: auto 5px;
    `

    const MoveCurrPieceButton = styled.button`
        width: ${props => props.moveButtonsHeight}px;
        height: ${props => props.moveButtonsHeight}px;
        border-radius: 50%;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        margin: auto;
    `

const Buttons = ({ setDisplayPausePage, setPressed, myBoard, setBoard, setPlaySound, playSound,
    setPauseGame, pauseGame, buttonsContainerWidth , buttonsContainerHeight }) => {

    const optionButtonsContainerWidth = buttonsContainerWidth;
    const optionButtonsContainerHeight = buttonsContainerHeight * 0.1;

    const optionButtonsWidth = optionButtonsContainerWidth / 3 - 30;
    const optionButtonsHeight = optionButtonsContainerHeight;

    const moveButtonsContainerHeight = buttonsContainerHeight * 0.9 - 2 - 20;
    
    const moveButtonsHeight = moveButtonsContainerHeight / 3;

    const pauseHandler = () => {
        setPauseGame(!pauseGame);
        setDisplayPausePage(true);
    }

    const rotateHandler = () => {
        myBoard.rotateCurrPiece("left");
        setBoard(_.cloneDeep(myBoard));
        setPressed((prev) => prev + " u")
    }

    const leftHandler = () => {
        myBoard.moveCurrPiece("left");
        setBoard(_.cloneDeep(myBoard));
        setPressed((prev) => prev + " l")
    }

    const rightHandler = () => {
        myBoard.moveCurrPiece("right");
        setBoard(_.cloneDeep(myBoard));
        setPressed((prev) => prev + " r")
    }

    const downHandler = () => {
        myBoard.moveCurrPiece("down");
        setBoard(_.cloneDeep(myBoard));
        setPressed((prev) => prev + " d")
    }

    const preventContextMenu = (e) => {
        e.preventDefault();
        setPressed((prev) => prev + " CM")
    }

    return (
        <ButtonsContainer buttonsContainerWidth={buttonsContainerWidth} buttonsContainerHeight={buttonsContainerHeight}>
            <OptionButtonsContainer optionButtonsContainerWidth={optionButtonsContainerWidth} optionButtonsContainerHeight={optionButtonsContainerHeight}>
                <OptionButton {...useMusicPlayer(pauseGame)} optionButtonsWidth={optionButtonsWidth} optionButtonsHeight={optionButtonsHeight}>Music</OptionButton>
                <OptionButton onClick={() => { setPlaySound(!playSound) }} optionButtonsWidth={optionButtonsWidth} optionButtonsHeight={optionButtonsHeight}>Sound</OptionButton>
                <OptionButton onClick={pauseHandler} optionButtonsWidth={optionButtonsWidth} optionButtonsHeight={optionButtonsHeight}>{pauseGame ? "Play" : "Pause"}</OptionButton>
            </OptionButtonsContainer>
            <MoveButtonsGrid moveButtonsContainerHeight={moveButtonsContainerHeight} >
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rotateHandler, 200)} style={{ gridArea: "1 / 2 / 2 / 3" }} moveButtonsHeight={moveButtonsHeight}>Rotate</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(leftHandler, 200)} style={{ gridArea: "2 / 1 / 3 / 2" }} moveButtonsHeight={moveButtonsHeight}>Left</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rightHandler, 200)} style={{ gridArea: "2 / 3 / 3 / 4" }} moveButtonsHeight={moveButtonsHeight}>Right</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(downHandler, 200)} style={{ gridArea: "3 / 2 / 4 / 3" }} moveButtonsHeight={moveButtonsHeight}>Down</MoveCurrPieceButton>
            </MoveButtonsGrid>
        </ButtonsContainer>
    )
}

export default Buttons;
