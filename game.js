class Game {
  constructor() {
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    this._currentSymbol = "X";
    this.timesPlayed = 0;
  }

  playAt(x, y) {
    const numX = Number(x);
    const numY = Number(y);

    if (numX > 2 || numY > 2) {
      throw new Error(
        `X and Y must be in [0, 2] interval. Supplied values: x=${x}, y=${y}.`
      );
    }
    if (this.board[numY][numX] === " ") {
      this.timesPlayed++;
      this.board[numY][numX] = this._currentSymbol;
      this.computeNextSymbol();
      return true;
    } else {
      return false;
    }
  }

  checkGameOver() {
    if (this.wonInColumn()) {
      return true;
    }
    if (this.wonInRow()) {
      return true;
    }
    if (this.wonInDiagonal()) {
      return true;
    }
    if (this.timesPlayed === 9) {
      console.log("tie");
      return true;
    }

    return false;
  }

  wonInColumn() {
    for (let i = 0; i < 3; i++) {
      const currentColumn = i;
      const firstValue = this.board[0][currentColumn];
      const currentColumnValues = [];

      for (let j = 0; j < 3; j++) {
        currentColumnValues.push(this.board[j][currentColumn]);
      }

      const allEqual = currentColumnValues.every((elem) => elem === firstValue);
      const winner = allEqual && firstValue !== " ";
      if (winner) {
        console.log(`${firstValue} won.`);
        return true;
      }
    }
    return false;
  }

  wonInRow() {
    for (let i = 0; i < 3; i++) {
      const currentRow = i;
      const firstValue = this.board[currentRow][0];
      const allEqual = this.board[currentRow].every(
        (elem) => elem === firstValue
      );
      const winner = allEqual && firstValue !== " ";
      if (winner) {
        console.log(`${firstValue} won.`);
        return true;
      }
    }
    return false;
  }

  wonInDiagonal() {
    return this.wonInMainDiagonal() || this.wonInSecondDiagonal();
  }

  wonInMainDiagonal() {
    const mainDiag = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      },
    ];
    let vals = [];
    for (let val of mainDiag) {
      vals.push(this.board[val.x][val.y]);
    }
    const allEqual = vals.every((elem) => elem === vals[0]);
    const winner = allEqual && vals[0] !== " ";
    if (winner) {
      console.log(`${vals[0]} won.`);
    }
    return winner;
  }

  wonInSecondDiagonal() {
    const secondDiag = [
      {
        x: 2,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
    ];

    let vals = [];
    for (let val of secondDiag) {
      vals.push(this.board[val.x][val.y]);
    }
    const allEqual = vals.every((elem) => elem === vals[0]);
    const winner = allEqual && vals[0] !== " ";
    if (winner) {
      console.log(`${vals[0]} won.`);
    }
    return winner;
  }

  computeNextSymbol() {
    this._currentSymbol = this._currentSymbol === "X" ? "Y" : "X";
  }

  get currentSymbol() {
    return this._currentSymbol;
  }

  printBoardWithCoords() {
    const coords = ["", 0, 1, 2];
    console.log("  0   1   2  ");
    for (let i = 0; i < 3; i++) {
      console.log(coords[i + 1], this.buildString(this.board[i]));
      if (i !== 2) {
        this.printSeparator();
      }
    }
  }

  printSeparator() {
    console.log("  _________");
  }

  buildString(line) {
    return line.join(" | ");
  }
}

export default Game;
