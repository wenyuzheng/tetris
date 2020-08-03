# Board
    - currPiece (Piece)
    - boardCells [Cell]
    - xMax
    - yMax 
    * moveCurrPieceLeft()
        // don't move if will go out of bound
        // don't move if will overlap another boardCell
    * moveCurrPieceRight()
    * moveCurrPieceDown()
    * moveCurrPieceRotateRight(center?) //later

# Cell
    - color  // later
    - position    
    * rotateLeft(centerCell)
    * rotateLeft(centerCell)

# Piece
    - pieceCells [Cell]
    * moveLeft()
    * moveRight()
    * moveDown()
    * moveRotateRight(center?) //later

# To do: 
1. show next piece
2. buttons mouseup + mousedown
3. high score rank (route)
4. different speed / level
5. css: @media queries
6. sound effect

1. paused page [later]


users -> {name: xxx, score: 0}