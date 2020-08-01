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
1. score when fill in one line [done]
2. buttons [done] + hotkeys onPress [later]
3. database score [done]
4. high score rank
5. Game over page [done]
6. paused page
7. home page / start page (back after game over)
8. css


users -> {name: xxx, score: 0}