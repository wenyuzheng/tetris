import { useEffect } from 'react';

export default (board, myBoard, yMax, setEndOfGame, setPauseGame, setLevel) => {
    useEffect(() => {
        for (let i = 0; i < myBoard.boardCells.length; i++) {
            if (myBoard.boardCells[i].y >= yMax) {
                setEndOfGame(true);
                setPauseGame(true);
                setLevel(1);
            }
        }
    }, [board])
}