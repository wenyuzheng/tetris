import React, { useEffect, useState } from 'react';
import "./StartPage.css";

const StartPage = ({ setDisplayStartPage, displayStartPage, setPauseGame}) => {

    const [display, setDisplay] = useState("");

    useEffect(() => {
        setDisplay(displayStartPage ? "" : "none")
    }, [displayStartPage])

    const startGameHandler = () => {
        // window.location.reload(false);
        setDisplayStartPage(false);
        setPauseGame(false);
    }

    return (
        <div className="startpage-modal" style={{display: display}}>
            <div className="startpage-modal-content">
                <h1>Tetris</h1>
                <button className="start-button" onClick={startGameHandler}>Start Game</button></div>
        </div>
    );
}

export default StartPage;