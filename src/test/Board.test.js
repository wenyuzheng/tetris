import Piece from "../lib/lib/Piece";
import Cell from '../lib/lib/Cell';
import Board from '../lib/lib/Board';
import _ from 'lodash';

describe("class Board", () => {
    it("constructor", () => {
        const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
        const boardCells1 = [new Cell(0, 0), new Cell(0, 1)];
        const myBoard = new Board(currPiece1, boardCells1, 10, 15);

        expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)]);
        expect(myBoard.boardCells).toEqual([new Cell(0, 0), new Cell(0, 1)]);
        expect(myBoard.xMax).toEqual(10);
        expect(myBoard.yMax).toEqual(15);
    })

    describe("isValid", () => {
        describe("canMoveCurrPieceLeft", () => {
            it("true", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(1, 3), new Cell(2, 3)]);
                expect(myBoard.isValid(newPiece)).toEqual(true);
            })

            it("false if out of board", () => {
                const currPiece1 = new Piece([new Cell(1, 3), new Cell(2, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(0, 3), new Cell(1, 3)]);
                expect(myBoard.isValid(newPiece)).toEqual(false);
            })

            it("false if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(1, 3)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(1, 3), new Cell(2, 3)]);
                expect(myBoard.isValid(newPiece)).toEqual(false);
            })
        })
        
        describe("canMoveCurrPieceRight", () => {
            it("true", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(3, 3), new Cell(4, 3)]);
                expect(myBoard.isValid(newPiece)).toEqual(true);
            })

            it("false if out of board", () => {
                const currPiece1 = new Piece([new Cell(9, 3), new Cell(10, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(10, 3), new Cell(11, 3)]);
                expect(myBoard.isValid(newPiece)).toEqual(false);
            })

            it("false if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(4, 3)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(3, 3), new Cell(4, 3)]);
                expect(myBoard.isValid(newPiece)).toEqual(false);
            })
        })

        describe("canMoveCurrPieceDown", () => {
            it("true", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(2, 2), new Cell(3, 2)]);
                expect(myBoard.isValid(newPiece)).toEqual(true);
            })

            it("false if out of board 3", () => {
                const currPiece1 = new Piece([new Cell(3, 1), new Cell(3, 2)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(3, 0), new Cell(3, 1)]);
                expect(myBoard.isValid(newPiece)).toEqual(false);
            })

            it("false if overlap existing piece 3", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(2, 2)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                const newPiece = new Piece([new Cell(2, 2), new Cell(3, 2)]);
                expect(myBoard.isValid(newPiece)).toEqual(false);
            })
        })
    })

    describe("moveCurrPiece", () => {
        describe("moveCurrPieceLeft", () => {
            it("moveCurrPieceLeft within range", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("left");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(1, 3), new Cell(2, 3)])
            })

            it("no moveCurrPieceLeft if out of board", () => {
                const currPiece1 = new Piece([new Cell(1, 3), new Cell(2, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("left");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(1, 3), new Cell(2, 3)])
            })

            it("no moveCurrPieceLeft if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(1, 3)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("left");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)])
            })
        })

        describe("moveCurrPieceRight", () => {
            it("moveCurrPieceRight within range", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("right");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(3, 3), new Cell(4, 3)])
            })

            it("no moveCurrPieceRight if out of board", () => {
                const currPiece1 = new Piece([new Cell(9, 3), new Cell(10, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("right");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(9, 3), new Cell(10, 3)])
            })

            it("no moveCurrPieceRight if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(4, 3)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("right");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)])
            })
        })

        describe("moveCurrPieceDown", () => {
            it("moveCurrPieceDown within range", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("down");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 2), new Cell(3, 2)])
            })

            it("no moveCurrPieceDown if out of board", () => {
                const currPiece1 = new Piece([new Cell(9, 1), new Cell(9, 2)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("down");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(9, 1), new Cell(9, 2)])
            })

            it("no moveCurrPieceDown if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(2, 2)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.moveCurrPiece("down");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)])
            })
        })
    })
    
    describe("rotateCurrPiece", () => {
        describe("rotateCurrPieceLeft", () => {
            it("rotateCurrPieceLeft within range", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.rotateCurrPiece("left");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(2, 4)])
            })

            it("no rotateCurrPieceLeft if out of board", () => {
                const currPiece1 = new Piece([new Cell(1, 3), new Cell(1, 4)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.rotateCurrPiece("left");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(1, 3), new Cell(1, 4)])
            })

            it("no rotateCurrPieceLeft if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(2, 4)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.rotateCurrPiece("left");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)])
            })
        })

        describe("rotateCurrPieceRight", () => {
            it("rotateCurrPieceRight within range", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.rotateCurrPiece("right");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(2, 2)])
            })

            it("no rotateCurrPieceRight if out of board", () => {
                const currPiece1 = new Piece([new Cell(10, 3), new Cell(10, 4)]);
                const boardCells1 = [];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.rotateCurrPiece("right");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(10, 3), new Cell(10, 4)])
            })

            it("no rotateCurrPieceRight if overlap existing piece", () => {
                const currPiece1 = new Piece([new Cell(2, 3), new Cell(3, 3)]);
                const boardCells1 = [new Cell(2, 2)];
                const myBoard = new Board(currPiece1, boardCells1, 10, 15);

                myBoard.rotateCurrPiece("right");
                expect(myBoard.currPiece.pieceCells).toEqual([new Cell(2, 3), new Cell(3, 3)])
            })
        })
    })

    describe("isPieceAtBottom", () => {
        it("true", () => {
            const currPiece1 = new Piece([new Cell(3, 1), new Cell(3, 2)]);
            const myBoard = new Board(currPiece1, [], 10, 15);
            expect(myBoard.isPieceAtBottom()).toEqual(true);
        })

        it("true", () => {
            const currPiece1 = new Piece([new Cell(3, 3), new Cell(3, 2)]);
            const myBoard = new Board(currPiece1, [new Cell(3, 1)], 10, 15);
            expect(myBoard.isPieceAtBottom()).toEqual(true);
        })

        it("false", () => {
            const currPiece1 = new Piece([new Cell(3, 3), new Cell(2, 3)]);
            const myBoard = new Board(currPiece1, [], 10, 15);
            expect(myBoard.isPieceAtBottom()).toEqual(false);
        })
    })

    describe("removeRow", () => {
        it("remove one row at the bottom", () => {
            const currPiece1 = new Piece([new Cell(3, 6)]);
            const boardCells = [new Cell(1, 1), new Cell(2, 1), new Cell(3, 1), new Cell(1, 2)];
            const myBoard = new Board(currPiece1, boardCells, 3, 6);
            myBoard.removeRow(1);
            expect(myBoard.boardCells).toEqual([new Cell(1, 1)]);
        })
    })

    describe("removeFullRows", () => {
        it("remove one row at the bottom", () => {
            const currPiece1 = new Piece([new Cell(3, 6)]);
            const boardCells = [new Cell(1, 1), new Cell(2, 1), new Cell(3, 1), new Cell(1, 2), new Cell(2, 2), new Cell(3, 2), new Cell(1, 3)];
            const myBoard = new Board(currPiece1, boardCells, 3, 6);
            const result = myBoard.removeFullRows();
            expect(myBoard.boardCells).toEqual([new Cell(1, 1)]);
            expect(result).toEqual(2);
        })
    })

    describe.only("canMoveFurther", () => {
        it("true can move down", () => {
            const currPiece1 = new Piece([new Cell(3, 3), new Cell(3, 2)]);
            const boardCells = [new Cell(4, 2), new Cell(2, 2)]
            const myBoard = new Board(currPiece1, boardCells, 10, 15);
            expect(myBoard.canMoveFurther()).toEqual(true);
        })

        it("true can move right", () => {
            const currPiece1 = new Piece([new Cell(3, 1), new Cell(3, 2)]);
            const boardCells = [new Cell(2, 2)]
            const myBoard = new Board(currPiece1, boardCells, 10, 15);
            expect(myBoard.canMoveFurther()).toEqual(true);
        })
        
        it("true can move left", () => {
            const currPiece1 = new Piece([new Cell(3, 1), new Cell(3, 2)]);
            const boardCells = [new Cell(4, 2)]
            const myBoard = new Board(currPiece1, boardCells, 10, 15);
            expect(myBoard.canMoveFurther()).toEqual(true);
        })

        it("false", () => {
            const currPiece1 = new Piece([new Cell(3, 1), new Cell(3, 2)]);
            const boardCells = [new Cell(4, 2), new Cell(2, 2)]
            const myBoard = new Board(currPiece1, boardCells, 10, 15);
            expect(myBoard.canMoveFurther()).toEqual(false);
        })
    })
})