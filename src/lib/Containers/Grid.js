import React from 'react';
import './css/Grid.css';

const Grid = ({xMax, yMax, board}) => {

    const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
    const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();

    return <>
        <div className="Grid">
            {xIndices.map((i) => {
                return yIndices.map((j) => {
                    let x = i;
                    let y = j;
                    if (board.onBoard(x, y)) {
                        const color = board.getCellAt(x, y).color;
                        return <div key={`${x}-${y}`} style={{ backgroundColor: color }}></div>
                    }
                    if (board.currPiece.onPiece(x, y)) {
                        const color = board.currPiece.getCellAt(x, y).color;
                        return <div key={`${x}-${y}`} style={{ backgroundColor: color }}></div>
                    }
                    return <div key={`${x}-${y}`} style={{ backgroundColor: "grey" }}></div>
                })
            })}
        </div>
    </>
}

export default Grid;