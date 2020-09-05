import { useState, useEffect } from 'react';

export default (callback) => {
    const [longPress, setLongPress] = useState(false)

    const [myInterval, setMyInterval] = useState(null)
    const [myTimeout, setMyTimeout] = useState(null)

    const threshHold = 250
    const repeatInterval = 20

    useEffect(() => {
        if (longPress && !myInterval) {
            setMyInterval(setInterval(() => {
                callback();
            }, repeatInterval))
        }
        if (!longPress && myInterval) {
            clearInterval(myInterval)
            setMyInterval(null)
        }
    }, [longPress, myInterval])

    const startHandler = () => {
        setMyTimeout(setTimeout(() => {
            setLongPress(true)
        }, threshHold))
    }

    const endHandler = () => {
        clearTimeout(myTimeout)
        setMyTimeout(null)
        if (longPress) {
            setLongPress(false)
        }
    }

    return {
        onMouseDown: () => startHandler(),
        onMouseUp: () => endHandler(),
        onMouseLeave: () => endHandler(),
        onTouchStart: () => startHandler(),
        onTouchEnd: () => endHandler(),
        onClick: () => callback(),
    };
}