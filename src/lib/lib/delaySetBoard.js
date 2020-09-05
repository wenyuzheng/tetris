import { useEffect, useState } from 'react';

export default (delay, endOfGame, myBoard, board, totalRemovedRows, setTotalRemovedRows, currToNextPieceHandler) => {

    const [timerStarted, setTimerStarted] = useState(false);
    const [doFinalCheck, setDoFinalCheck] = useState(false);
    const [newDelay, setNewDelay] = useState(delay);

    useEffect(() => {
        if (timerStarted) {
            setTimeout(() => {
                setTimerStarted(false);
                setDoFinalCheck(true);
            }, newDelay)
        }
    }, [timerStarted, newDelay])

    useEffect(() => {
        if (!endOfGame && !timerStarted && myBoard.isPieceAtBottom() && !doFinalCheck) {
            myBoard.canMoveFurther() ? setNewDelay(delay) : setNewDelay(0);
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