import React, { useEffect, useState } from 'react';
import "./css/StartPage.css";
import SelectLevel from '../Components/SelectLevel';
import { Link } from 'react-router-dom';

const StartPage = ({ setDelay, setDropSpeed, setLevel, level, displayStartPage, startGameHandler }) => {

    const [display, setDisplay] = useState("block");

    useEffect(() => {
        setDisplay(displayStartPage ? "block" : "none")
    }, [displayStartPage])

    return (
        <div className="startpage-modal" style={{ display: display }}>
            <div className="startpage-modal-content">
                <h1>Tetris</h1>
                <Link to="/leaderboard">
                    <button className="leaderboard-button" >Leaderboard</button>
                </Link>
                <SelectLevel setLevel={setLevel} level={level} setDelay={setDelay} setDropSpeed={setDropSpeed}/>
                <button className="start-button" onClick={startGameHandler}>Start Game</button>
            </div>
        </div>
    );
}

export default StartPage;