import React from 'react';

export default ( { setLevel, level} ) => {
    
    const style = {
        backgroundColor: "lightGrey",
        padding: 10,
        fontSize: 18,
        border: "1px solid black",
        width: "60%",
        margin: "10px auto",
    }

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