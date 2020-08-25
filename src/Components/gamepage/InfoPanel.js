import React from 'react';
import styled from 'styled-components';
import NextPieceGrid from './NextPieceGrid';

const InfoPanelContainer = styled.div`
  width: ${props => props.infoPanelWidth}px;
  height: ${props => props.infoPanelHeight}px;
  box-sizing: border-box;
  padding: 15px;
  float: left;
`

const InfoPanel = (displayHeight, displayWidth, nextPiece, level, totalRemovedRows) => {

    const squareLength = (displayHeight - 20 - 19) / 20;

    const infoPanelWidth = displayWidth - 20 - squareLength * 10 - 9;
    const infoPanelHeight = displayHeight - 20;
    
    return (
        <InfoPanelContainer infoPanelWidth={infoPanelWidth} infoPanelHeight={infoPanelHeight}>
            Next: <NextPieceGrid nextPiece={nextPiece} />
            <div style={{ margin: "20px 0" }}>Level: {level}</div>
            <div style={{ margin: "20px 0" }}>Score: {totalRemovedRows}</div>
            {/* <div style={{ margin: "20px 0", height: "200px", width: "150px", border: "1px solid red", overflow: "scroll" }}>{pressed}</div> */}
        </InfoPanelContainer>
    )
}

export default InfoPanel;