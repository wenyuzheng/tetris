import { useEffect } from 'react';
import _ from "lodash";

export default (pauseGame, myBoard, setBoard, dropSpeed) => {
    useEffect(() => {
        if (!pauseGame) {
            const autoDown = setInterval(() => {
                myBoard.moveCurrPiece("down");
                setBoard(_.cloneDeep(myBoard));
            }, dropSpeed)
            return () => clearInterval(autoDown)
        }
    }, [pauseGame])
}