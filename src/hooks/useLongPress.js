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
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false),
        onClick: () => callback(),
    };
}

// import { useState, useEffect } from 'react';

// export default (callback, ms) => {

//     const [startLongPress, setStartLongPress] = useState(false);
//     const [startFireCallback, setStartFireCallback] = useState(false);

//     useEffect(() => {
//         let longPressTimeOut;

//         const startFire = () => {
//             let timeOut;
//             if (startFireCallback) {
//                 timeOut = setTimeout(() => callback(), ms);
//             } else {
//                 clearTimeout(timeOut);
//             }

//             return () => {
//                 clearTimeout(timeOut);
//             };
//         }

//         if (startLongPress) {
//             longPressTimeOut = setTimeout(startFire, 200);
//         } else {
//             clearTimeout(longPressTimeOut);
//         }

//         return () => {
//             clearTimeout(longPressTimeOut);
//         };

//     }, [callback, ms, startFireCallback, startLongPress]);

//     const start = () => {
//         setStartLongPress(true);
//         setStartFireCallback(true);
//     }

//     const stop = () => {
//         setStartLongPress(false);
//         setStartFireCallback(false);
//     }

//     return {
//         onMouseDown: () => start(),
//         onMouseUp: () => stop(),
//         onMouseLeave: () => stop(),
//         onTouchStart: () => start(),
//         onTouchEnd: () => stop(),
//         onClick: () => callback(),
//     };
// }