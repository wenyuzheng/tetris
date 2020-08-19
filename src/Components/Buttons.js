import React from 'react';
import _ from 'lodash';
import useMusicPlayer from '../hooks/useMusicPlayer';
import './css/Buttons.css';
import useLongPress from '../hooks/useLongPress';
import styled from 'styled-components';

const Buttons = ({ setPressed, myBoard, setBoard, setPauseGame, pauseGame, buttonsContainerWidth , buttonsContainerHeight }) => {

    const optionButtonsContainerWidth = buttonsContainerWidth;
    const optionButtonsContainerHeight = buttonsContainerHeight * 0.1;

    const moveButtonsContainerHeight = buttonsContainerHeight * 0.9 - 2 - 20;

    const optionButtonsWidth = optionButtonsContainerWidth / 3 - 30;
    const optionButtonsHeight = optionButtonsContainerHeight;
    
    const moveButtonsHeight = moveButtonsContainerHeight / 3;

    const ButtonsContainer = styled.div`
        width: ${buttonsContainerWidth}px;
        height: ${buttonsContainerHeight}px;
        // background-color: purple;
    `

    const OptionButtonsContainer = styled.div`
        width: ${optionButtonsContainerWidth}px;
        height: ${optionButtonsContainerHeight}px;
        margin: auto;
        // background-color: aquamarine;
    `

    const MoveButtonsGrid = styled.div`
        width: ${moveButtonsContainerHeight}px;
        height: ${moveButtonsContainerHeight}px;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        margin: 10px auto;
        // background-color: pink;
    `

    const OptionButton = styled.button`
        width: ${optionButtonsWidth}px;
        height: ${optionButtonsHeight}px;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        margin: auto 5px;
        // background-color: red;
    `

    const MoveCurrPieceButton = styled.button`
        width: ${moveButtonsHeight}px;
        height: ${moveButtonsHeight}px;
        border-radius: 50%;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        margin: auto;
    `

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

    const rotateLongPressHandler = useLongPress(rotateHandler, 200);
    const leftLongPressHandler = useLongPress(leftHandler, 200);
    const rightLongPressHandler = useLongPress(rightHandler, 200);
    const downLongPressHandler = useLongPress(downHandler, 200);

    return (
        <ButtonsContainer>
            <OptionButtonsContainer>
                <OptionButton {...useMusicPlayer()}>Music</OptionButton>
                <OptionButton>Sound</OptionButton>
                <OptionButton onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</OptionButton>
            </OptionButtonsContainer>
            <MoveButtonsGrid>
                <MoveCurrPieceButton {...rotateLongPressHandler} style={{ gridArea: "1 / 2 / 2 / 3"}}>Rotate</MoveCurrPieceButton>
                <MoveCurrPieceButton {...leftLongPressHandler} style={{ gridArea: "2 / 1 / 3 / 2" }}>Left</MoveCurrPieceButton>
                <MoveCurrPieceButton {...rightLongPressHandler} style={{ gridArea: "2 / 3 / 3 / 4" }}>Right</MoveCurrPieceButton>
                <MoveCurrPieceButton {...downLongPressHandler} style={{ gridArea: "3 / 2 / 4 / 3" }}>Down</MoveCurrPieceButton>
            </MoveButtonsGrid>
        </ButtonsContainer>
    )
}

export default Buttons;
