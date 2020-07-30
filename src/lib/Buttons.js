import React from 'react';
import _ from 'lodash';
import MusicPlayer from './MusicPlayer';

const Buttons = ({myBoard, setBoard, setPauseGame, pauseGame}) => {
    const moveCurrPieceButtons = ["down", "left", "right", "rotate"];

    return (
        <div>
            {moveCurrPieceButtons.map((button) => {
                return (
                    <button key={button}
                        onClick={() => {
                            button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
                            setBoard(_.cloneDeep(myBoard));
                        }}
                    >{button}</button>
                )
            })}
            <MusicPlayer />
            <button onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</button>
        </div>
    )
}

export default Buttons;
