import React, {useEffect} from 'react';
import firebase from '../firebase';

const LeaderBoard = () => {

    useEffect(() => {
        firebase.database().ref("/tetris").orderByChild("score").on("child_added", snap => {
            console.log(snap.val());
        });
    }, [])

  return(
      <div>

      </div>
  )
}

export default LeaderBoard;