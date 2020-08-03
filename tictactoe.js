import readline from "readline";

import Game from "./game.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "TIC-TAC-TOE> ",
});

const game = new Game();
console.log(
  "In order to play, specify the coordinates in this format: x,y (0 indexed)."
);
game.printBoardWithCoords();
rl.prompt();

rl.on("line", (line) => {
  const [x, y] = line.trim().split(",");
  const validMove = game.playAt(x, y);
  if (!validMove) {
    console.log("Position is already filled. Please select another one.");
  } else {
    if (game.checkGameOver()) {
      process.exit(0);
    }
  }
  game.printBoardWithCoords();
  console.log(`Next player: ${game.currentSymbol}`);
  rl.prompt();
}).on("close", () => {
  process.exit(0);
});
