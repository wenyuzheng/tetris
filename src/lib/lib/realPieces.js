import Piece from './Piece';
import Cell from './Cell';

const rightStep = new Piece([
    new Cell(5, 20, true, "blue"),
    new Cell(6, 20, false, "blue"),
    new Cell(5, 19, false, "blue"),
    new Cell(4, 19, false, "blue")
], "left", { left: "right", right: "left" })

const leftStep = new Piece([
    new Cell(5, 20, true, "orange"),
    new Cell(4, 20, false, "orange"),
    new Cell(5, 19, false, "orange"),
    new Cell(6, 19, false, "orange")
], "left", { left: "right", right: "left" })

const square = new Piece([
    new Cell(5, 20, true, "yellow"),
    new Cell(6, 20, false, "yellow"),
    new Cell(5, 19, false, "yellow"),
    new Cell(6, 19, false, "yellow")
], "left", { left: false, right: false })

const rod = new Piece([
    new Cell(5, 20, false, "green"),
    new Cell(5, 19, true, "green"),
    new Cell(5, 18, false, "green"),
    new Cell(5, 17, false, "green")
], "right", { left: "right", right: "left" })

const rightL = new Piece([
    new Cell(5, 20, false, "purple"),
    new Cell(5, 19, true, "purple"),
    new Cell(5, 18, false, "purple"),
    new Cell(6, 18, false, "purple")
], "left", { left: "right", right: "right" })

const leftL = new Piece([
    new Cell(5, 20, false, "aquamarine"),
    new Cell(5, 19, true, "aquamarine"),
    new Cell(5, 18, false, "aquamarine"),
    new Cell(4, 18, false, "aquamarine")
], "left", { left: "right", right: "right" })

const hat = new Piece([
    new Cell(5, 20, true, "red"),
    new Cell(4, 20, false, "red"),
    new Cell(6, 20, false, "red"),
    new Cell(5, 19, false, "red")
], "left", { left: "right", right: "right" })

export default [rightStep, leftStep, square, rod, rightL, leftL, hat];