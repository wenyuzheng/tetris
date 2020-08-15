import React from 'react';
import _ from 'lodash';
import MusicPlayer from './MusicPlayer';
import './css/Buttons.css';
import useLongPress from '../hooks/useLongPress';

const Buttons = ({ myBoard, setBoard, setPauseGame, pauseGame }) => {

    const moveCurrPieceButtons = ["down", "left", "right", "rotate"];

    // const handler = () => {
    //     button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
    //     setBoard(_.cloneDeep(myBoard));
    // }
    const handler = null;

    const [onMouseDownHandler, onMouseUpHandler] = useLongPress(handler, 500, 50);

    return (
        <div>
            <MusicPlayer />
            <button className="buttons" onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</button>

            <div>
                {moveCurrPieceButtons.map((button) => {
                    const handler = () => {
                        button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
                        setBoard(_.cloneDeep(myBoard));
                    }

                    return (
                        <button key={button}
                            className="buttons"
                            onMouseDown={onMouseDownHandler}
                            onMouseUp={onMouseUpHandler}
                        >{button}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Buttons;
