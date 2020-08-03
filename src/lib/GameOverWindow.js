import React, { useState, useEffect } from 'react';
import './GameOverWindow.css';
import firebase from '../firebase';

const GameOverWindow = ({ endOfGame, totalRemovedRows, setDisplayStartPage }) => {
    const [display, setDisplay] = useState("none");
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        setDisplay(endOfGame ? "" : "none")
    }, [endOfGame])

    const saveHandler = () => {
        if (userName === "" || userName === null) {
            alert("Please enter your username!")
        } else {
            let currTime = new Date();
            let timeId = currTime.getTime();
            firebase.database().ref(`/tetris/${userName}/${timeId}/score`).set(totalRemovedRows);
            setDisplay("none");
            setDisplayStartPage(true);
            setUserName("");
        }
    }

    const cancelHandler = () => {
        setDisplay("none");
        setDisplayStartPage(true);
    }

    const style = {margin: "20px"};

    return (
        <div className="modal" style={{ display: display}}>
            <div className="modal-content">
                <h1>GAME OVER</h1>
                <h3 style={style}>Your Score is: {totalRemovedRows}</h3>
                <div style={style}>Type in your username to save your score</div>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} 
                    placeholder="Your username" className="username-input"/>
                <div>
                    <button onClick={saveHandler} className="game-over-buttons">Save</button>
                    <button onClick={cancelHandler} className="game-over-buttons">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default GameOverWindow;