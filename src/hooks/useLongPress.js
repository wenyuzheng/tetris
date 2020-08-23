import { useState, useEffect } from 'react';

export default (callback, ms) => {

    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timeOut;
        if (startLongPress) {
            timeOut = setTimeout(() => callback(), ms);
        } else {
            clearTimeout(timeOut);
        }

        return () => {
            clearTimeout(timeOut);
        };
    }, [callback, ms, startLongPress]);

    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => setStartLongPress(false),
        onMouseLeave: () => setStartLongPress(false),
        onMouseOut: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false),
        onTouchMove: () => setStartLongPress(false),
        // onTouchCancel: () => setStartLongPress(false),
    };
}