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
1. different speed when hold and click [done]
2. pausepage start button [done]
3. audio no sound on ios devices [done]
4. change level when removedLines increases [done]
5. level 0 [done]
6. sound Effect
