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

export default ({ setLevel, level, setDelay, setDropSpeed, totalRemovedRows } ) => {
    
    useEffect(() => {
        setDelay(levels[level].delay)
        setDropSpeed(levels[level].dropSpeed)
        // console.log(level)
    }, [setLevel, level]);

    useEffect(() => {
        if (level <= 1 && totalRemovedRows > 1) {
            setLevel(1);
        } else if (level <= 2 && totalRemovedRows >= 1 && totalRemovedRows < 10) {
            setLevel(2);
            // console.log("set level to 2")
        } else if (totalRemovedRows >= 10) {
            setLevel(3);
        }
        // console.log("total reoved lines changed")
    }, [totalRemovedRows]);

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