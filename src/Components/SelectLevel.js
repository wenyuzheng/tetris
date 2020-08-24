import React, { useEffect } from 'react';

const style = {
    backgroundColor: "lightGrey",
    padding: 10,
    fontSize: 18,
    border: "1px solid black",
    margin: "10px auto",
}

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

export default ({ setLevel, level, setDelay, setDropSpeed } ) => {
    
    useEffect(() => {
        setDelay(levels[level].delay)
        setDropSpeed(levels[level].dropSpeed)
    }, [setLevel, level])

    return (
        <div>
            <select style={style} value={level} onChange={e => setLevel(e.target.value)}>
                <option default value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
            </select>
        </div>
    )
}