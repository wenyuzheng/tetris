import { useEffect, useState } from 'react';
import musicFile from '../asset/sound/music.mp3';

const music = new Audio(musicFile);
// music.src = "https://vgmdownloads.com/soundtracks/tetris-dr.-spin-remixes/eepzmnta/01%20-%20tetris%20-%207%27%27%20mix.mp3";

const useMusicPlayer = (pauseGame) => {

    const [playMusic, setPlayMusic] = useState(false);

    useEffect(() => {
        playMusic ? music.play() : music.pause();
    }, [playMusic])

    useEffect(() => {
        if (playMusic) {
            pauseGame ? music.pause() : music.play();
        }
    }, [pauseGame, playMusic])

    return {
        onClick: () => setPlayMusic(!playMusic),
        // onClick: () => music.play(),
    }
}

export default useMusicPlayer;