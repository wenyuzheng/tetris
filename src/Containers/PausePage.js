import React from 'react';
import './css/PausePage.css';
import _ from "lodash";

const PausePage = (props) => {

    const resumeHandler = () => {
        props.setPauseGame(false); 
        props.setDisplayPausePage(false);
    }

    // const homeHandler = () => {
    //     props.setDisplayStartPage(true);
    //     props.setDisplayPausePage(false);
    // }

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Game Paused</h1>
                <button onClick={resumeHandler} className="pause-buttons">Resume</button>
                {/* <button onClick={homeHandler} className="pause-buttons">Home</button> */}
            </div>
        </div>
    );
}

export default PausePage;