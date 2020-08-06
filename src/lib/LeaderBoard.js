import React, {useEffect, useState} from 'react';
import firebase from '../firebase';
import './LeaderBoard.css';

const LeaderBoard = () => {

    const [rank, setRank] = useState([]);

    useEffect(() => {
        firebase.database().ref("/scores").orderByChild("score").limitToFirst(5).on("value", snap => {
            let newRank = []; 
            snap.forEach((childSnap) => {
                newRank.push(childSnap.val())
            });
            setRank(newRank.reverse());
        });
    }, []);

    return(
        <div onClick={() => console.log(Object.keys(rank))}>
            <table className='students'>
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
    )
}

export default LeaderBoard;