import Cell from "./Cell";
import Piece from "./Piece";
import _ from 'lodash';

const generatePiece = (xMax, yMax) => {
    const pieceCells = [generateFirstCell(xMax, yMax)];
    for (let i = 0; i < 3; i++) {
        pieceCells.push(generateNextCell(pieceCells, xMax, yMax));
    }

    const color = randomColor();
    pieceCells.forEach((cell) => {
        cell.color = color;
    })

    pieceCells[1].isCenter = true;
    return new Piece(pieceCells);
}

const generateFirstCell = (xMax, yMax) => new Cell(Math.floor(xMax / 2), yMax);

const generateNextCell = (existingCells, xMax, yMax) => {
    let adjCells = [];
    for (let i = 0; i < existingCells.length; i++) {
        const x = existingCells[i].x;
        const y = existingCells[i].y;
        adjCells.push(new Cell(x - 1, y));
        adjCells.push(new Cell(x + 1, y));
        adjCells.push(new Cell(x, y - 1));
        adjCells.push(new Cell(x, y + 1));
    }

    adjCells = _.uniq(adjCells);

    adjCells = adjCells.filter((cell) => {
        return cell.x >= 1 && cell.x <= xMax && cell.y >= 1 && cell.y <= yMax
    })

    adjCells = adjCells.filter((cell) => {
        return isNotInExistingCells(cell, existingCells);
    })

    return _.sample(adjCells);
}

const isNotInExistingCells = (cell, existingCells) => {
    for (let i = 0; i < existingCells.length; i++) {
        if (cell.x === existingCells[i].x && cell.y === existingCells[i].y) {
        return false;
        }
    }
    return true;
}

const randomColor = () => {
    const colors = ["red", "green", "blue", "yellow", "purple"];
    return _.sample(colors);
}

export default generatePiece;