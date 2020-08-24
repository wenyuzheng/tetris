import React, { useState, useEffect } from 'react';
import App from './App';

const Store = () => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [doFinalCheck, setDoFinalCheck] = useState(false);
    const [delay, setDelay] = useState(2000);

    useEffect(()=> {
        if (timerStarted) {
            setTimeout(() => {
                setTimerStarted(false);
                setDoFinalCheck(true);
            }, delay)
        }
    }, [timerStarted])
    
    return <App setDelay={setDelay} doFinalCheck={doFinalCheck} setDoFinalCheck={setDoFinalCheck} timerStarted={timerStarted} setTimerStarted={setTimerStarted}/>
}

export default Store;