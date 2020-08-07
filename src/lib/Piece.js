class Piece {
    constructor(newCellsArr) {
        this.pieceCells = newCellsArr;
        for (let i = 0; i < this.pieceCells.length; i++) {
            if (this.pieceCells[i].isCenter) {
                this.centerCell = this.pieceCells[i];
                break;
            }
        }
        if (!this.centerCell) {
            this.centerCell = this.pieceCells[0];
        }
    }

    minX() {
        const allX = this.pieceCells.map(cell => cell.x)
        return Math.min(...allX);
    }

    minY() {
        const allY = this.pieceCells.map(cell => cell.y)
        return Math.min(...allY);
    }

    onPiece(x, y) {
        for (let i = 0; i < this.pieceCells.length; i++) {
            if (this.pieceCells[i].x === x && this.pieceCells[i].y === y) {
                return true;
            }
        }
        return false;
    }

    getCellAt(x,y) {
        for (let i = 0; i < this.pieceCells.length; i++) {
            if (this.pieceCells[i].x === x && this.pieceCells[i].y === y) {
                return this.pieceCells[i];
            }
        }
        return false;
    }

    move(direction) {
        for (let i = 0; i < this.pieceCells.length; i++) {
            this.pieceCells[i].move(direction);
        }
    }

    rotate(center, direction) {
        this.pieceCells.forEach((cell) => {
            cell.rotate(center, direction);
        })
    }
}

export default Piece;