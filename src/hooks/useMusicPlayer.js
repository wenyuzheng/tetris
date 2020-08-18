import { useEffect, useState } from 'react';
import musicFile from '../asset/tetris.mp3';

const music = new Audio(musicFile);

const useMusicPlayer = () => {

    const [playMusic, setPlayMusic] = useState(false);

    useEffect(() => {
        playMusic ? music.play() : music.pause();
    }, [playMusic])

    return {
        onClick: () => setPlayMusic(!playMusic),
    }
}

export default useMusicPlayer;