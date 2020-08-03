import React, { useEffect, useState } from 'react';
import "./StartPage.css";

const StartPage = ({ displayStartPage, startGameHandler }) => {

    const [display, setDisplay] = useState("");

    useEffect(() => {
        setDisplay(displayStartPage ? "" : "none")
    }, [displayStartPage])

    return (
        <div className="startpage-modal" style={{display: display}}>
            <div className="startpage-modal-content">
                <h1>Tetris</h1>
                <button className="start-button" onClick={startGameHandler}>Start Game</button></div>
        </div>
    );
}

export default StartPage;