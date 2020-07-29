import React, { useState, useEffect } from 'react';
import App from './App';

const Store = () => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [doFinalCheck, setDoFinalCheck] = useState(false);
    useEffect(()=> {
        if (timerStarted) {
            setTimeout(() => {
                setTimerStarted(false);
                setDoFinalCheck(true);
            }, 2000)
        }
    }, [timerStarted])
    return <App doFinalCheck={doFinalCheck} setDoFinalCheck={setDoFinalCheck} timerStarted={timerStarted} setTimerStarted={setTimerStarted}/>
}

export default Store;