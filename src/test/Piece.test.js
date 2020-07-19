import Cell from "../lib/Cell";
import Piece from "../lib/Piece";

describe("class Piece", () => {
    it("constructor", () => {
        const cell1 = new Cell(2, 3)
        const cell2 = new Cell(3, 3)
        const myPiece = new Piece([cell1, cell2])
        expect(myPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)])
        // expect(myPiece.cells === [new Cell(2, 3), new Cell(3, 3)]).toEqual(true)
    })

    describe("move", () => {
        it("moveLeft", () => {
            const myPiece = new Piece([new Cell(2, 3), new Cell(3, 3)]);
            myPiece.move("left");
            expect(myPiece.pieceCells).toEqual([new Cell(1, 3), new Cell(2, 3)]);
        })

        it("moveRight", () => {
            const myPiece = new Piece([new Cell(2, 3), new Cell(3, 3)]);
            myPiece.move("right");
            expect(myPiece.pieceCells).toEqual([new Cell(3, 3), new Cell(4, 3)]);
        })

        it("moveDown", () => {
            const myPiece = new Piece([new Cell(2, 3), new Cell(3, 3)]);
            myPiece.move("down");
            expect(myPiece.pieceCells).toEqual([new Cell(2, 2), new Cell(3, 2)]);
        })
    })

    describe("rotate", () => {
        it("rotateLeft", () => {
            const myPiece = new Piece([new Cell(3,2), new Cell(3,3)])
            const center = new Cell(3,1);

            myPiece.rotate(center, "left");
            expect(myPiece).toEqual(new Piece([new Cell(2, 1), new Cell(1, 1)]));
        })

        it("rotateRight", () => {
            const myPiece = new Piece([new Cell(3, 2), new Cell(3, 3)])
            const center = new Cell(3, 1);

            myPiece.rotate(center, "right");
            expect(myPiece).toEqual(new Piece([new Cell(4, 1), new Cell(5, 1)]));
        })
    })
})