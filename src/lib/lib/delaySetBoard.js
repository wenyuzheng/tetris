import { useEffect, useState } from 'react';

export default (delay, setDelay, endOfGame, myBoard, board, totalRemovedRows, setTotalRemovedRows, currToNextPieceHandler) => {

    const [timerStarted, setTimerStarted] = useState(false);
    const [doFinalCheck, setDoFinalCheck] = useState(false);

    useEffect(() => {
        if (timerStarted) {
            setTimeout(() => {
                setTimerStarted(false);
                setDoFinalCheck(true);
            }, delay)
        }
    }, [timerStarted, delay])

    useEffect(() => {
        if (!endOfGame && !timerStarted && myBoard.isPieceAtBottom() && !doFinalCheck) {
            myBoard.canMoveFurther() ? setDelay(2000) : setDelay(0); //set delay to levels[level].delay if true
            setTimerStarted(true);
        }
        setDoFinalCheck(false);
    }, [board, setTimerStarted, doFinalCheck])

    useEffect(() => {
        if (doFinalCheck) {
            if (!endOfGame && myBoard.isPieceAtBottom()) {
                myBoard.boardCells.push(...myBoard.currPiece.pieceCells);
                setTotalRemovedRows(totalRemovedRows + myBoard.removeFullRows());
                currToNextPieceHandler();
                setDoFinalCheck(false);
            }
        }
    }, [doFinalCheck])
}