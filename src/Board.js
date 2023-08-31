class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }


  getCol(index) {
    const result = [];
    for (let i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }


  generateBoard() {
    const hardPuzzle = [
      ["", "", 2, "", "", "", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ]

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    const result = [];
    const boxRowStart = rowIndex - (rowIndex % 3);
    const boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index) {
    const result = []
    const startingRow = Math.floor(index / 3) * 3;
    const startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;

  }
  /*
           _             _     _
       ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
      / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
      \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
      |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
  
   */

  /*=========================================================================
  =                 TODO: fill in these Checker Functions                    =
  =========================================================================*/

  rowSafe(row, num) {
    return !this.getRow(row).includes(num)
    //check if the row contains num
  }

  colSafe(col, num) {
    return !this.getCol(col).includes(num)
    //check if the column contains num
  }

  boxSafe(row, col, num) {
    return !this.getBox(row, col).includes(num)
    //check if the box contains num
  }

  rowValidAt(rowIndex) {
    let row = this.getRow(rowIndex)
    for (let i = 0; i < row.length; i++) {
      let numocc = 0
      if (row[i] !== "" && row[i] !== 0) {
        for (let index = 0; index < row.length; index++) {
          if (row[i] === row[index]) {
            numocc++
          }
        }
        if (numocc > 1) {
          return false
        }
      }
    }
    return true
  }

  colValidAt(colIndex) {
    let col = this.getCol(colIndex)
    for (let i = 0; i < col.length; i++) {
      let numocc = 0
      if (col[i] !== "" && col[i] !== 0) {
        for (let index = 0; index < col.length; index++) {
          if (col[i] === col[index]) {
            numocc++
          }
        }
        if (numocc > 1) {
          return false
        }
      }
    }
    return true
    //check if a column is valid at a given index
  }

  boxValidAt(boxIndex) {
    let box = this.getBoxByIndex(boxIndex)
    for (let i = 0; i < box.length; i++) {
      let numocc = 0
      if (box[i] !== "" && box[i] !== 0) {
        for (let index = 0; index < box.length; index++) {
          if (box[i] === box[index]) {
            numocc++
          }
        }
        if (numocc > 1) {
          return false
        }
      }
    }
    return true
    //check if a box is valid at a given index
  }

  allRowsValid() {
    for (let index = 0; index < this.board.length; index++) {
      if (!this.rowValidAt(index)) {
        return false
      }
    }
    return true
    //check if all the rows in the board are valid
  }
  allColsValid() {
    for (let index = 0; index < this.board.length; index++) {
      if (!this.colValidAt(index)) {
        return false
      }
    }
    return true
    //check if all the columns in the board are valid
  }
  allBoxesValid() {
    for (let index = 0; index < this.board.length; index++) {
      if (!this.boxValidAt(index)) {
        return false
      }
    }
    return true
    //check if all the boxes in the board are valid
  }

  validBoard() {
    return this.allBoxesValid() && this.allColsValid() && this.allRowsValid();
  }

  isSafe(row, col, num) {
    return this.rowSafe(row, num) && this.colSafe(col, num) && this.boxSafe(row, col, num);
  }

  /*=========================================================================
  =                 TODO: fill in these Solver Functions                    =
  =========================================================================*/

  solve(row=0, col=0) {
    //base case
    if (row === 8 && col === 9) return true
    if (col === 9) {
      col = 0
      row++
    }
    if (this.board[row][col] !== 0&&  this.board[row][col]!=="" ) {
      return this.solve( row, col+1)
    }
    for (let index = 1; index < 10; index++) {
      if (this.isSafe(row, col, index)) {
        this.board[row][col]=index
        if(this.solve(row,col+1)) return true
      }
      this.board[row][col] = 0;
    }
    return false
    //solve the board using a backtracking algorithm and return the solution
  }

  solveBoard() {
    while (this.validBoard()) {
      if (this.solve()) {
        this.emit("validBoard", this.board);
        return true
      }
    }
    this.emit("invalidBoard");
    return false
    // dont forget to add a small change here ;) 
  }
}
