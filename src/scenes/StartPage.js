import React from 'react';
import "./css/StartPage.css";
import SelectLevel from '../components/startpage/SelectLevel';
import { Link } from 'react-router-dom';

const StartPage = ({ setDelay, setDropSpeed, setLevel, level, totalRemovedRows, startGameHandler }) => {

    return (
        <div className="startpage-modal">
            <div className="startpage-modal-content">
                <h1>Tetris</h1>
                <Link to="/leaderboard">
                    <button className="leaderboard-button" >Leaderboard</button>
                </Link>
                <SelectLevel setLevel={setLevel} level={level} setDelay={setDelay} 
                    setDropSpeed={setDropSpeed} totalRemovedRows={totalRemovedRows} />
                <button className="start-button" onClick={startGameHandler}>Start Game</button>
            </div>
        </div>
    );
}

export default StartPage;