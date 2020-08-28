class Piece {
    constructor(newCellsArr, lastRotation, rotationSequence) {
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
        this.lastRotation = lastRotation;
        this.rotationSequence = rotationSequence;
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

    baseRotate(center, direction) {
        this.pieceCells.forEach((cell) => {
            if (!direction) {
                // do nothing
            } else {
                cell.rotate(center, direction);
            }
        })
    }

    rotate(center) {
        const nextRotation = this.rotationSequence[this.lastRotation];
        this.lastRotation = nextRotation;
        this.baseRotate(center, nextRotation);
    }
}

export default Piece;