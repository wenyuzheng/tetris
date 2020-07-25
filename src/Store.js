import React, { useState, useEffect } from 'react';
import App from './App';

const Store = () => {
    // console.log("rerender Store");
    const [timerStarted, setTimerStarted] = useState(false);
    const [doFinalCheck, setDoFinalCheck] = useState(false);
    useEffect(()=> {
        if (timerStarted) {
            console.log("time put started");
            setTimeout(() => {
                console.log("time out ended");
                setTimerStarted(false);
                setDoFinalCheck(true);
            }, 2000)
        }
    }, [timerStarted])
    return <App doFinalCheck={doFinalCheck} setDoFinalCheck={setDoFinalCheck} timerStarted={timerStarted} setTimerStarted={setTimerStarted}/>
}

export default Store;