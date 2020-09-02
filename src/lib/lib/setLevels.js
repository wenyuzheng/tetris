import { useEffect } from 'react';

const levels = {
    1: {
        delay: 2000,
        dropSpeed: 1000,
    },
    2: {
        delay: 1500,
        dropSpeed: 500,
    },
    3: {
        delay: 800,
        dropSpeed: 300,
    },
}

export default (level, setLevel, setDelay, setDropSpeed, totalRemovedRows) => {

    useEffect(() => {
        setDelay(levels[level].delay)
        setDropSpeed(levels[level].dropSpeed)
    }, [setLevel, level]);

    useEffect(() => {
        if (level <= 1 && totalRemovedRows > 5) {
            setLevel(1);
        } else if (level <= 2 && totalRemovedRows >= 5 && totalRemovedRows < 10) {
            setLevel(2);
        } else if (totalRemovedRows >= 10) {
            setLevel(3);
        }
    }, [totalRemovedRows]);

}