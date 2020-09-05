import React from 'react';
import './css/PausePage.css';

const PausePage = (props) => {

    const resumeHandler = () => {
        props.setPauseGame(false); 
        props.setDisplayPausePage(false);
    }

    const homeHandler = () => {
        props.myBoard.boardCells.push(...props.myBoard.currPiece.pieceCells);
        props.setDisplayStartPage(true);
        props.setDisplayPausePage(false);
        props.setLevel(1);
        props.setTotalRemovedRows(0);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Game Paused</h1>
                <button onClick={resumeHandler} className="pause-buttons">Resume</button>
                <button onClick={homeHandler} className="pause-buttons">Home</button>
            </div>
        </div>
    );
}

export default PausePage;