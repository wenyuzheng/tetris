import Cell from '../lib/Cell';

describe("class Cell", () => {
    it("constructor", () => {
        const myCell = new Cell(5, 2);
        expect(myCell.x).toEqual(5);
        expect(myCell.y).toEqual(2);
    })

    it("rotateLeft", () => {
        const centerCell = new Cell(5, 5);
        const myCell = new Cell(8, 3);

        myCell.rotate(centerCell, "left")
        expect(myCell).toEqual(new Cell(7, 8));
    })

    it("rotateRight", () => {
        const centerCell = new Cell(5, 5);
        const myCell = new Cell(7, 8);

        myCell.rotate(centerCell, "right")
        expect(myCell).toEqual(new Cell(8, 3));
    })
})
