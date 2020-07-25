import _ from 'lodash';

class Board {
    constructor(currPiece, boardCells, xMax, yMax) {
        this.currPiece = currPiece;
        this.boardCells = boardCells;
        this.xMax =xMax;
        this.yMax = yMax;
    }

    onBoard(x, y) {
        for (let i = 0; i < this.boardCells.length; i++) {
            if (this.boardCells[i].x === x && this.boardCells[i].y === y) {
                return true;
            }
        }
        return false;
    }

    getCellAt(x, y) {
        for (let i = 0; i < this.boardCells.length; i++) {
            if (this.boardCells[i].x === x && this.boardCells[i].y === y) {
                return this.boardCells[i];
            }
        }
        return false;
    }

    isValid(pieceCopy) {
        for (let i = 0; i < pieceCopy.pieceCells.length; i++) {
            if (1 > pieceCopy.pieceCells[i].x || 
                pieceCopy.pieceCells[i].x > this.xMax || 
                pieceCopy.pieceCells[i].y < 1 ||
                pieceCopy.pieceCells[i].y > this.yMax ) { return false; }
            for (let j = 0; j < this.boardCells.length; j++) {
                if (pieceCopy.pieceCells[i].x === this.boardCells[j].x &&
                    pieceCopy.pieceCells[i].y === this.boardCells[j].y) {
                    return false;
                }
            }
        }
        return true;
    }
    
    moveCurrPiece(direction) {
        const pieceCopy = _.cloneDeep(this.currPiece);
        pieceCopy.move(direction);
        if (this.isValid(pieceCopy)) {
            this.currPiece.move(direction);
        }
    }
    
    rotateCurrPiece(direction) {
        const pieceCopy = _.cloneDeep(this.currPiece);
        pieceCopy.rotate(pieceCopy.centerCell, direction);
        if (this.isValid(pieceCopy)) {
            this.currPiece.rotate(this.currPiece.centerCell, direction);
        }
    }

    isPieceAtBottom() {
        for (let i = 0; i < this.currPiece.pieceCells.length; i++){
            if (this.currPiece.pieceCells[i].y === 1) {
                return true
            }
            for (let j = 0; j < this.boardCells.length; j++) {
                if (this.currPiece.pieceCells[i].x === this.boardCells[j].x &&
                    this.currPiece.pieceCells[i].y-1 === this.boardCells[j].y) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default Board;