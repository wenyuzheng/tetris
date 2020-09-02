import { useEffect } from 'react';
import useSound from 'use-sound';
import clearSnd from '../../asset/sound/clear.mp3';
import gameOverSnd from '../../asset/sound/gameOver.mp3';

export default (playSound, totalRemovedRows, endOfGame) => {

    const [clearSound] = useSound(clearSnd);
    const [gameOverSound] = useSound(gameOverSnd);

    useEffect(() => {
        if (playSound) {
            clearSound();
        }
    }, [totalRemovedRows, playSound])

    useEffect(() => {
        if (playSound && endOfGame) {
            gameOverSound();
        }
    }, [playSound, endOfGame])
}