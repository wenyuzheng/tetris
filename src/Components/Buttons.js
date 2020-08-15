import React from 'react';
import _ from 'lodash';
import MusicPlayer from './MusicPlayer';
import './css/Buttons.css';
import useLongPress from '../hooks/useLongPress';

const Buttons = ({ myBoard, setBoard, setPauseGame, pauseGame }) => {

    const moveCurrPieceButtons = ["rotate", "left", "right", "down"];

    // const handler = () => {
    //     button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
    //     setBoard(_.cloneDeep(myBoard));
    // }
    const handler = null;

    const [onMouseDownHandler, onMouseUpHandler] = useLongPress(handler, 500, 50);

    return <div className="buttonsBox">
            <div className="optionBox">
                <MusicPlayer />
                <button className="soundButton">Sound</button>
            </div>
            <div className="controlBox">
                <div className="moveButtonBox">
                    {moveCurrPieceButtons.map((button) => {
                        const handler = () => {
                            button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
                            setBoard(_.cloneDeep(myBoard));
                        }

                        return <>
                            <button key={button}
                                className="buttons"
                                onMouseDown={onMouseDownHandler}
                                onMouseUp={onMouseUpHandler}
                            >{button}</button>
                        </>
                    })}
                </div>
                <button className="pauseButton" onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</button>
            </div>
        </div>
}

export default Buttons;
