import { useEffect, useState } from 'react';
import musicFile from '../asset/sound/music.mp3';

const music = new Audio(musicFile);

const useMusicPlayer = (pauseGame, setPlayMusic, playMusic) => {

    const [firstPlay, setFirstPlay] = useState(true);

    useEffect(() => {
        playMusic ? music.play() : music.pause();
    }, [playMusic])

    useEffect(() => {
        if (playMusic) {
            pauseGame ? music.pause() : music.play();
        }
    }, [pauseGame, playMusic])

    return {
        onClick: () => {
            setPlayMusic(!playMusic);
            if (firstPlay) {
                music.play();
                setFirstPlay(false);
            }
        },
    }
}

export default useMusicPlayer;