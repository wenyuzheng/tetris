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
1. auto down
2. rotate at the top => out of bound [done]
3. isPieceAtBottom: stack on existing piece also count [done]
4. score when fill in one line
5. end of game [done]


# 2 sec timer:
1. isPieceAtBottom === true  => start 2 sec timer
2. after 2 sec => push currPiece.pieceCells as boardCells
3. if after 2 sec, can moveDown => moveDown 