import React, { useState, useEffect } from 'react';
import "./App.css"

const App = () => {
    const [clicked, setClicked] = useState(false)
    const [longPress, setLongPress] = useState(false)

    const [myInterval, setMyInterval] = useState(null)
    const [myTimeout, setMyTimeout] = useState(null)

    const threshHold = 2000
    const repeatInterval = 20

    // Functions
    const [text, setText] = useState('')
    const callbackHold = () => { setText(prev => prev + " H") }
    const callbackClick = () => { setText(prev => prev + " C") }

    useEffect(() => {
        if (clicked) {
            callbackClick()
            setClicked(false)
        }
    }, [clicked])

    useEffect(() => {
        if (longPress && !myInterval) {
            callbackHold()
            setMyInterval(setInterval(callbackHold, repeatInterval))
        }
        if (!longPress && myInterval) {
            clearInterval(myInterval)
            setMyInterval(null)
        }
    }, [longPress, myInterval])

    const touchMoveHandler = () => {
      setText(prev => prev + " TM")
      // setMyTimeout(setTimeout(() => {
      //   setLongPress(true)
      // }, threshHold))
    }

    const startHandler = () => {
        setText(prev => prev + " TS")
        setMyTimeout(setTimeout(() => {
            setLongPress(true)
        }, threshHold))
    }

    const endHandler = () => {
        setText(prev => prev + " TE")
        clearTimeout(myTimeout)
        setMyTimeout(null)
        if (longPress) {
            setLongPress(false)
        } else {
            setClicked(true)
        }
    }

    const contextMenueHandler = (e) => {
        e.preventDefault()
    }


    const style = { display: "flex", border: "1px solid black", width: "100px", margin: "30px auto" }
    const style1 = { border: "1px solid black", width: "300px", margin: "30px auto", height: "400px", overflow: "scroll", textAlign: "left" }

    return (
        <div className="App">
            <div className="Line"><span>Clicked: </span><span>{clicked.toString()}</span></div>
            <div className="Line"><span>longPress: </span><span>{longPress.toString()}</span></div>

            <div style={style} onMouseDown={startHandler} onMouseUp={endHandler} onTouchMove={touchMoveHandler} onTouchEnd={endHandler} onTouchStart={startHandler} onContextMenu={contextMenueHandler}>
                {/* <div style={style} onTouchEnd={touchEndHandler} onTouchStart={touchStartHandler} onContextMenu={contextMenueHandler}> */}
                <div style={{ margin: "auto", height: "50px", width: "100px", backgroundColor: 'green' }}></div>
            </div>
            <div style={style1}>
                {text}
            </div>

        </div>
    );
}

export default App;
