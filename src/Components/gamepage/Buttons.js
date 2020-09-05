import React, {useState, useEffect} from 'react';
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
        myBoard.rotateCurrPiece();
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

    const preventContextMenu = (e) => {
        e.preventDefault();
    }


    // const [clicked, setClicked] = useState(false)
    // const [longPress, setLongPress] = useState(false)

    // const [myInterval, setMyInterval] = useState(null)
    // const [myTimeout, setMyTimeout] = useState(null)

    // const threshHold = 2000
    // const repeatInterval = 20

    // // Functions
    // const callbackHold = () => { setPressed(prev => prev + " H") }
    // const callbackClick = () => { setPressed(prev => prev + " C") }

    // useEffect(() => {
    //     if (clicked) {
    //         callbackClick()
    //         rotateHandler();
    //         setClicked(false)
    //     }
    // }, [clicked])

    // useEffect(() => {
    //     if (longPress && !myInterval) {
    //         callbackHold()
    //         setMyInterval(setInterval(() => {
    //             callbackHold();
    //             rotateHandler();
    //         }, repeatInterval))
    //     }
    //     if (!longPress && myInterval) {
    //         clearInterval(myInterval)
    //         setMyInterval(null)
    //     }
    // }, [longPress, myInterval])

    // // const touchMoveHandler = () => {
    // //     setText(prev => prev + " TM")
    // //     // setMyTimeout(setTimeout(() => {
    // //     //   setLongPress(true)
    // //     // }, threshHold))
    // // }

    // const startHandler = () => {
    //     setPressed(prev => prev + " TS")
    //     setMyTimeout(setTimeout(() => {
    //         setLongPress(true)
    //     }, threshHold))
    // }

    // const endHandler = () => {
    //     setPressed(prev => prev + " TE")
    //     clearTimeout(myTimeout)
    //     setMyTimeout(null)
    //     if (longPress) {
    //         setLongPress(false)
    //     } else {
    //         setClicked(true)
    //     }
    // }

    return (
        <ButtonsContainer buttonsContainerWidth={buttonsContainerWidth} buttonsContainerHeight={buttonsContainerHeight}>
            <OptionButtonsContainer optionButtonsContainerWidth={optionButtonsContainerWidth} optionButtonsContainerHeight={optionButtonsContainerHeight}>
                <OptionButton {...useMusicPlayer(pauseGame)} optionButtonsWidth={optionButtonsWidth} optionButtonsHeight={optionButtonsHeight}>Music</OptionButton>
                <OptionButton onClick={() => {setPlaySound(!playSound)}} optionButtonsWidth={optionButtonsWidth} optionButtonsHeight={optionButtonsHeight}>Sound</OptionButton>
                <OptionButton onClick={pauseHandler} optionButtonsWidth={optionButtonsWidth} optionButtonsHeight={optionButtonsHeight}>{pauseGame ? "Play" : "Pause"}</OptionButton>
            </OptionButtonsContainer>
            <MoveButtonsGrid moveButtonsContainerHeight={moveButtonsContainerHeight} >
                {/* <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rotateHandler, 100)} style={{ gridArea: "1 / 2 / 2 / 3" }} moveButtonsHeight={moveButtonsHeight}>Rotate</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(leftHandler, 100)} style={{ gridArea: "2 / 1 / 3 / 2" }} moveButtonsHeight={moveButtonsHeight}>Left</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rightHandler, 100)} style={{ gridArea: "2 / 3 / 3 / 4" }} moveButtonsHeight={moveButtonsHeight}>Right</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(downHandler, 100)} style={{ gridArea: "3 / 2 / 4 / 3" }} moveButtonsHeight={moveButtonsHeight}>Down</MoveCurrPieceButton> */}
            
                {/* <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} onMouseDown={startHandler} onMouseUp={endHandler} onTouchEnd={endHandler} onTouchStart={startHandler} style={{ gridArea: "1 / 2 / 2 / 3" }} moveButtonsHeight={moveButtonsHeight}>Rotate</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(leftHandler, 200, 50)} style={{ gridArea: "2 / 1 / 3 / 2" }} moveButtonsHeight={moveButtonsHeight}>Left</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rightHandler, 100)} style={{ gridArea: "2 / 3 / 3 / 4" }} moveButtonsHeight={moveButtonsHeight}>Right</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(downHandler, 100)} style={{ gridArea: "3 / 2 / 4 / 3" }} moveButtonsHeight={moveButtonsHeight}>Down</MoveCurrPieceButton> */}
            
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rotateHandler)} style={{ gridArea: "1 / 2 / 2 / 3" }} moveButtonsHeight={moveButtonsHeight}>Rotate</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(leftHandler)} style={{ gridArea: "2 / 1 / 3 / 2" }} moveButtonsHeight={moveButtonsHeight}>Left</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(rightHandler)} style={{ gridArea: "2 / 3 / 3 / 4" }} moveButtonsHeight={moveButtonsHeight}>Right</MoveCurrPieceButton>
                <MoveCurrPieceButton onContextMenu={(e) => preventContextMenu(e)} {...useLongPress(downHandler)} style={{ gridArea: "3 / 2 / 4 / 3" }} moveButtonsHeight={moveButtonsHeight}>Down</MoveCurrPieceButton>
            </MoveButtonsGrid>
        </ButtonsContainer>
    )
}

export default Buttons;
