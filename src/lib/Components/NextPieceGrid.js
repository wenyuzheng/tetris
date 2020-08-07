import React from 'react';
import './css/NextPieceGrid.css';
import _ from 'lodash';

const NextPieceGrid = ({ board }) => {

    const minX = board.nextPiece.minX();
    const minY = board.nextPiece.minY();
    const xIndices = _.range(minX, minX + 4);
    const yIndices = _.range(minY, minY + 4).reverse();

    return (
        <div className="NextPieceGrid">
            {xIndices.map((x) => {
                return yIndices.map((y) => {
                    if (board.nextPiece.onPiece(x, y)) {
                        const color = board.nextPiece.getCellAt(x, y).color;
                        return <div key={`${x}-${y}`} style={{ backgroundColor: color }}></div>
                    }
                    return <div key={`${x}-${y}`} style={{ backgroundColor: "grey" }}></div>
                })
            })}
        </div>
    )
}

export default NextPieceGrid;