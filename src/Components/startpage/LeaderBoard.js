import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import '../css/LeaderBoard.css';
import { Link } from 'react-router-dom';

const LeaderBoard = () => {

    const [rank, setRank] = useState(null);

    useEffect(() => {
        firebase.database().ref("/scores").orderByChild("score").limitToLast(5).once("value", snap => {
            let newRank = []; 
            snap.forEach((childSnap) => {
                newRank.push(childSnap.val())
            });
            setRank(newRank.reverse());
        });
    }, []);

    if (rank) {
        return <>
            <Link to="/">
                <button className="home-button">Home</button>
            </Link>
            <div>
                <table className='score'>
                    <tbody>
                        <tr>
                            <th>USERNAME</th>
                            <th>SCORE</th>
                            <th>DATE</th>
                        </tr>
                        {Object.values(rank).map((scoreObj, i) => {
                            return (
                                <tr key={i}>
                                    <td>{scoreObj.userName}</td>
                                    <td>{scoreObj.score}</td>
                                    <td>{new Date(scoreObj.timeStamp).toLocaleDateString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    } else {
        <Loading/>
    }    
}

export default LeaderBoard;