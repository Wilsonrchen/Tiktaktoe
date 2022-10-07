//Game state
let gameState = {
  board: [null, null, null, null, null, null, null, null, null],
  playerName: "",
  aiSwitch: false,
  currentPlayer: "X",
  roundWon: false,
};

// Dom references
const board = document.getElementById("board");
const friendBrain = document.querySelector(".friendBtn");
const smoothBrain = document.querySelector(".smoothBtn");
const bigBrain = document.querySelector(".bigBtn"); //not coded yet
const form = document.querySelector("form");
const formid = document.getElementById("formid");
const player1Input = document.getElementById("player1Name");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 5, 8],
];
//Variables
let currentPlayer = "X";
let player2 = "O";
let computer = "O";
let turnX = true; //turn order X to start
let count = 0;

//functions
function renderBoard() {
  for (let i = 0; i < gameState.board.length; i++) {
    const currValue = gameState.board[i];
    const currCell = document.getElementById(`${i}`);
    currCell.innerText = currValue;
  }
}

function checkWinner() {
  for (let i = 0; i < gameState.board.length; i++) {
    let num = winArray[i];
    let null1 = gameState.board[num[0]];
    let null2 = gameState.board[num[1]];
    let null3 = gameState.board[num[2]];

    if (null1 === null || null2 === null || null3 === null) {
      continue;
    }
    if (null1 === null2 && null2 === null3) {
      gameState.roundWon = true;
      if (turnX) {
        turnX = false;
        statusText.innerText = "O Winner!";
      } else {
        statusText.innerText = "X Winner!";
      }
    }
  }
}
function checkDraw() {
  if (count === 9) {
    statusText.innerText = "Draw!";
  }
}
function smoothBot() {
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i] === null && gameState.aiSwitch === true) {
      gameState.board[i] = computer;
      turnX = true;
      count += 1;
      console.log(`Im getting into smoothbot!`);
      break;
    }
  }
  // return Math.floor(Math.random()* gameState.board.length);
}
console.log(smoothBot);
function restartGame() {
  gameState = {
    board: [null, null, null, null, null, null, null, null, null],
    playerName: "",
    roundWon: false,
    currentPlayer: "X",
    aiSwitch: false,
  };
  count = 0;
  statusText.innerText = `${player1Input.value} starts`;
  renderBoard();
  turnX = true;
}

//Event listeners
board.addEventListener("click", function (event) {
  const index = event.target.id;
  count++;
  if (gameState.board[index] === null && gameState.roundWon === false) {
    if (turnX) {
      turnX = false;
      gameState.board[index] = gameState.currentPlayer;
      statusText.innerText = `${player2}'s turn`;

      if (gameState.aiSwitch === true) {
        turnX = true;
        console.log(`Here I go switching again`);
        statusText.innerText = `${gameState.currentPlayer}'s turn`;
        smoothBot();
      }
    } else if (gameState.aiSwitch === false) {
      turnX = true;
      gameState.board[index] = player2;
      statusText.innerText = `${gameState.currentPlayer}'s turn`;
    }
  }
  checkDraw();
  renderBoard();
  checkWinner();
});
restartBtn.addEventListener("click", function (event) {
  restartGame();
});

smoothBrain.addEventListener("click", function (event) {
  gameState.aiSwitch = true;
});
friendBrain.addEventListener("click", function (event) {
  gameState.aiSwitch = false;
});

formid.addEventListener("submit", function (event) {
  event.preventDefault();
  gameState.playerName = player1Input.value;
  formid.style.display = `None`;
  statusText.innerText = `${gameState.playerName} starts`;
});
