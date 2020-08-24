import { useEffect, useState } from 'react';
import musicFile from '../asset/tetris.mp3';

const music = new Audio(musicFile);

const useMusicPlayer = (pauseGame) => {

    const [playMusic, setPlayMusic] = useState(false);

    useEffect(() => {
        playMusic ? music.play() : music.pause();
    }, [playMusic])

    useEffect(() => {
        if (playMusic) {
            pauseGame ? music.pause() : music.play();
        }
    }, [pauseGame])

    return {
        onClick: () => setPlayMusic(!playMusic),
    }
}

export default useMusicPlayer;