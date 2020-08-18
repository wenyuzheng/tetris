import React from 'react';
import _ from 'lodash';
import MusicPlayer from '../hooks/useMusicPlayer';
import './css/Buttons.css';
import useLongPress from '../hooks/useLongPress';
import styled from 'styled-components';

const Buttons = ({ myBoard, setBoard, setPauseGame, pauseGame, buttonsContainerWidth , buttonsContainerHeight }) => {

    const optionButtonsContainerWidth = buttonsContainerWidth;
    const optionButtonsContainerHeight = buttonsContainerHeight * 0.1;

    const moveButtonsContainerHeight = buttonsContainerHeight * 0.9 - 2 - 20;

    const optionButtonsWidth = optionButtonsContainerWidth / 3 - 30;
    const optionButtonsHeight = optionButtonsContainerHeight;
    
    const moveButtonsHeight = moveButtonsContainerHeight / 3;

    const ButtonsContainer = styled.div`
        width: ${buttonsContainerWidth}px;
        height: ${buttonsContainerHeight}px;
        background-color: purple;
    `

    const OptionButtonsContainer = styled.div`
        width: ${optionButtonsContainerWidth}px;
        height: ${optionButtonsContainerHeight}px;
        margin: auto;
        background-color: aquamarine;
    `

    const MoveButtonsGrid = styled.div`
        width: ${moveButtonsContainerHeight}px;
        height: ${moveButtonsContainerHeight}px;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        margin: 10px auto;
        background-color: pink;
    `

    const OptionButton = styled.button`
        width: ${optionButtonsWidth}px;
        height: ${optionButtonsHeight}px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        margin: auto 5px;
        background-color: red;
    `

    const MoveCurrPieceButton = styled.button`
        width: ${moveButtonsHeight}px;
        height: ${moveButtonsHeight}px;
        border-radius: 50%;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        margin: auto;
    `

    const rotateHandler = () => {
        myBoard.rotateCurrPiece("left");
        setBoard(_.cloneDeep(myBoard));
    }

    const leftHandler = () => {
        myBoard.moveCurrPiece("left");
        setBoard(_.cloneDeep(myBoard));
    }

    const rightHandler = () => {
        myBoard.moveCurrPiece("right");
        setBoard(_.cloneDeep(myBoard));
    }

    const downHandler = () => {
        myBoard.moveCurrPiece("down");
        setBoard(_.cloneDeep(myBoard));
    }

    const rotateLongPressHandler = useLongPress(rotateHandler, 50);
    const leftLongPressHandler = useLongPress(leftHandler, 50);
    const rightLongPressHandler = useLongPress(rightHandler, 50);
    const downLongPressHandler = useLongPress(downHandler, 50);

    return (
        <ButtonsContainer>
            <OptionButtonsContainer>
                <OptionButton {...MusicPlayer()}>Music</OptionButton>
                {/* <MusicPlayer optionButtonsHeight={optionButtonsHeight} optionButtonsWidth={optionButtonsWidth}/> */}
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
