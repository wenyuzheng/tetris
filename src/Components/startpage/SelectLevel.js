import React, { useEffect } from 'react';

const style = {
    backgroundColor: "lightGrey",
    padding: 10,
    fontSize: 18,
    border: "1px solid black",
    margin: "10px auto",
}

export default ({ setLevel, level } ) => {
    
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