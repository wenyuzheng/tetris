import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
    width: ${props => props.squareLength * 10 + 9}px;
    height: ${props => props.squareLength * 20 + 19}px;
    display: grid;
    grid-template-rows: repeat(20, 1fr);
    grid-template-columns: repeat(10, 1fr);
    gap: 1px;
    background-color: black;
    grid-auto-flow: column;
    float: left;
`

const Grid = ({ xMax, yMax, board, displayHeight}) => {
    
    const squareLength = (displayHeight - 20 - 19) / 20;

    const xIndices = Array.from(Array(xMax), (_, i) => i + 1);
    const yIndices = Array.from(Array(yMax), (_, i) => i + 1).reverse();

    return <>
        <GridContainer squareLength={squareLength}>
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
                    return <div key={`${x}-${y}`} style={{ backgroundColor: "#a4a4a4" }}></div>
                })
            })}
        </GridContainer>
    </>
}

export default Grid;