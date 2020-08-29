import _ from 'lodash';

class Board {
    constructor(currPiece, boardCells, nextPiece, xMax, yMax) {
        this.currPiece = currPiece;
        this.boardCells = boardCells;
        this.nextPiece = nextPiece;
        this.xMax = xMax;
        this.yMax = yMax;
    }

    removeRow(j) {
        const newCells = [];
        this.boardCells.forEach(cell => {
            if (cell.y > j) {
                cell.y -= 1;
                newCells.push(cell);
            } else if (cell.y === j) {
            } else {
                newCells.push(cell);
            }
        })
        this.boardCells = newCells;
    }

    removeFullRows() {
        let removedRows = 0;
        const xIndices = Array.from(Array(this.xMax), (_, i) => i + 1);

        for (let y = 1; y <= this.yMax; y++) {
            if (xIndices.every(x => this.onBoard(x, y))){
                this.removeRow(y);
                y -= 1;
                removedRows += 1;
            }
        }
        return removedRows;
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

    canMoveFurther() {
        const pieceCopy = _.cloneDeep(this.currPiece);
        
        const directions = ["down", "left", "right"];
        directions.map((direction) => {
            pieceCopy.move(direction);
            if (this.isValid(pieceCopy)) {
                console.log("is valid")
                return true
            }
        })

        return false
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
        pieceCopy.rotate(pieceCopy.centerCell);
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