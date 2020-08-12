import React, { useState } from 'react';
import _ from 'lodash';
import MusicPlayer from './MusicPlayer';
import './css/Buttons.css';

const Buttons = ({ myBoard, setBoard, setPauseGame, pauseGame }) => {

    const moveCurrPieceButtons = ["down", "left", "right", "rotate"];

    const [isMouseDown, setIsMouseDown] = useState(false);

    let move = null;

    return (
        <div>
            <MusicPlayer />
            <button className="buttons" onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</button>

            <div>
                {moveCurrPieceButtons.map((button) => {
                    const mouseDownHandler = () => {
                        setIsMouseDown(true);
                        button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
                        setBoard(_.cloneDeep(myBoard));
                    }

                    return (
                        <button key={button}
                            className="buttons"
                            onMouseDown={() => {
                                move = setTimeout(mouseDownHandler, 500)
                            }}
                            onMouseUp={() => {
                                clearTimeout(move);
                                if (!isMouseDown) {
                                    mouseDownHandler();
                                }
                                setIsMouseDown(false);
                            }}
                        >{button}</button>
                    )
                })}
            </div>
        </div>
    )
}

// const Buttons = ({myBoard, setBoard, setPauseGame, pauseGame}) => {
//     const moveCurrPieceButtons = ["down", "left", "right", "rotate"];

//     return (
//         <div>
//             {moveCurrPieceButtons.map((button) => {
//                 return (
//                     <button key={button}
//                         onMouseDown={() => {
//                             button === "rotate" ? myBoard.rotateCurrPiece("left") : myBoard.moveCurrPiece(button);
//                             setBoard(_.cloneDeep(myBoard));
//                         }}
//                     >{button}</button>
//                 )
//             })}
//             <MusicPlayer />
//             <button onClick={() => setPauseGame(!pauseGame)}>{pauseGame ? "Play" : "Pause"}</button>
//         </div>
//     )
// }

export default Buttons;
