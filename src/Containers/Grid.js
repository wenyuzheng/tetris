import React from 'react';
import './css/Grid.css';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';

const GridContainer = styled.div`
    width: ${props => props.squareLength * 10 + 9}px;
    height: ${props => props.squareLength * 20 + 19}px;
    display: grid;
    grid-template-rows: repeat(20, 1fr);
    grid-template-columns: repeat(10, 1fr);
    gap: 1px;
    background-color: black;
    margin: 20px;
    grid-auto-flow: column;
`

const Grid = ({xMax, yMax, board}) => {
    const [screenWidth, screenHeight] = useWindowSize()
    const squareLength = Math.floor(screenWidth / 15)

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
                    return <div key={`${x}-${y}`} style={{ backgroundColor: "grey" }}></div>
                })
            })}
        </GridContainer>
    </>
}

export default Grid;