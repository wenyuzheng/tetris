import React, { useEffect, useState } from 'react';
import musicFile from '../../asset/tetris.mp3';

const music = new Audio(musicFile);

const MusicPlayer = () => {
    const [playMusic, setPlayMusic] = useState(false);

    useEffect(() => {
        playMusic ? music.play() : music.pause();
    }, [playMusic])

    return (
        <button onClick={() => setPlayMusic(!playMusic)}>Music</button>
    )
}

export default MusicPlayer;