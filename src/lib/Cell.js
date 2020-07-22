class Cell {
    constructor(newCellX, newCellY, isCenter=false, color) {
        this.x = newCellX;
        this.y = newCellY;
        this.isCenter = isCenter;
        this.color = color;
    }

    move(direction) {
        if (direction === "left") { this.x -= 1 };
        if (direction === "right") { this.x += 1 };
        if (direction === "down") { this.y -= 1};
    }

    rotate(centerCell, direction) {
        const vectorAB = new Cell(this.x - centerCell.x, this.y - centerCell.y)
        const vectorABRotatedLeft = direction === "left" ? new Cell(-vectorAB.y, vectorAB.x) : new Cell(vectorAB.y, -vectorAB.x);
        const newVectorOB = new Cell(centerCell.x + vectorABRotatedLeft.x, centerCell.y + vectorABRotatedLeft.y)
        this.x = newVectorOB.x
        this.y = newVectorOB.y
    }

    hasReachedBottom() {
        if (this.y = 1) {
            return true
        }
        return false
    }
}

export default Cell;