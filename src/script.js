function resetDom() {
  const all = Array.from(document.querySelectorAll(".dom"));
  all.forEach((el) => (el.style.display = "none"));
}

function changeVisibility(elementToShow, style) {
  const all = Array.from(document.querySelectorAll(".dom"));

  all.forEach((domElement) => {
    if (
      domElement.classList.contains("visible") &&
      domElement !== elementToShow
    ) {
      domElement.classList.remove("visible");
      setTimeout(() => {
        console.log("hello");
        domElement.style.display = "none";
      }, 30);
    }
  });
  elementToShow.style.display = style;
  setTimeout(() => {
    elementToShow.classList.add("visible");
  }, 30);
}

function resetEventListener(btn, fun) {
  btn.removeEventListener("click", fun);
  btn.addEventListener("click", fun);
}

class Game {
  constructor() {
    Game.prototype.state = { isDisplayed: false };
    this.gamefield = document.querySelector("#gameContainer");
    this.cells = document.querySelectorAll(".cell");
    this.statusText = document.querySelector("#statusText");
    this.resetBtn = document.querySelector("#resetBtn");
    this.backMenuBtn = document.querySelector("#backMenuBtn");
    this.currentBoard = ["", "", "", "", "", "", "", "", ""];
    this.gameIsRunning = false;
    this.winConditons = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.players = ["", ""];
    this.gamefield.style.display = "none";
  }

  startGame(player1, player2) {
    this.restartGame();

    this.gamefield.style.display = "block";
    setTimeout(() => {
      this.gamefield.classList.add("visible");
    }, 200);

    this.cells.forEach((cell) => {
      resetEventListener(cell, this.handleCellClick);
    });
    resetEventListener(this.resetBtn, this.restartGame);
    resetEventListener(this.backMenuBtn, this.backMenu);

    this.statusText.textContent = "Choose field to start.";
    this.players[0] = player1;
    this.players[1] = player2;

    this.currentPlayer = this.players[0];
    this.gameIsRunning = true;
  }

  backMenu = () => {
    this.gameIsRunning = false;

    this.gamefield.classList.remove("visible");
    setTimeout(() => {
      this.gamefield.style.display = "none";

      document.querySelector("#menuContainer").classList.add("visible");
      document.querySelector("#menuContainer").style.display = "grid";
      document.querySelector(".menuStatusContainer").style.display = "block";
    }, 300);
  };

  handleCellClick = (event) => {
    const cellIndex = event.target.getAttribute("id");
    this.makeMove(cellIndex);
  };

  makeMove = (cellIndex) => {
    if (this.currentBoard[cellIndex] === "" && this.gameIsRunning) {
      this.fillCell(cellIndex);
    }
  };

  fillCell(index) {
    this.cells[index].textContent = `${this.currentPlayer}`;
    this.currentBoard[index] = this.currentPlayer;
    this.checkWinner();
    this.changePlayer();
  }

  checkWinner() {
    for (let i = 0; i < this.winConditons.length; i++) {
      let conditon = this.winConditons[i];
      let fieldA = this.currentBoard[conditon[0]];
      let fieldB = this.currentBoard[conditon[1]];
      let fieldC = this.currentBoard[conditon[2]];
      if (fieldA === "" || fieldB === "" || fieldC === "") {
        continue;
      }
      if (fieldA === fieldB && fieldB === fieldC) {
        this.statusText.textContent = `The winner is ${this.currentPlayer} !`;

        this.gameIsRunning = false;
        this.highlightFields(conditon);
        break;
      }
    }
    if (!this.currentBoard.includes("") && this.gameIsRunning) {
      this.statusText.textContent = "Draw.. Start again.";
      this.gameIsRunning = false;
      return;
    }
  }

  changePlayer() {
    if (this.gameIsRunning) {
      this.currentPlayer =
        this.currentPlayer === this.players[0]
          ? this.players[1]
          : this.players[0];
      this.statusText.textContent = `It's ${this.currentPlayer}'s move`;
    }
  }

  restartGame = () => {
    this.currentBoard = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = this.players[0];
    this.cells.forEach(
      (cell) => (
        (cell.textContent = ""),
        (cell.style.textShadow = "none"),
        (cell.style.fontSize = "60px"),
        (cell.style.color = "black")
      )
    );
    this.statusText.textContent = "Choose field to start.";
    this.gameIsRunning = true;
  };

  highlightFields(arr) {
    arr.forEach((index) => {
      const cell = this.cells[index];
      cell.style.textShadow = `5px 5px 30px white, -5px -5px 30px white, 5px -5px 30px white, -5px 5px 30px white`;
      cell.style.fontSize = "70px";
      cell.style.color = "red";
    });
  }
}

// Menu Values
const main = document.querySelector("#main");
const body = document.querySelector("body");

const menu = document.querySelector("#menuContainer");
const startBtn = document.querySelector("#startBtn");
const optionsBtn = document.querySelector("#optionsBtn");
const optionsContainer = document.querySelector("#optionsContainer");
const changeMarksCotainer = document.querySelector("#changeMarksCotainer");
const backMainMenuBtn = document.querySelector("#backMainMenuBtn");
const backOptionsBtn = document.querySelector("#backOptionsBtn");
const markBtns = document.querySelectorAll(".markBtn");
const menuStatus = document.querySelector("#menuStatus");
const menuStatusContainer = document.querySelector(".menuStatusContainer");
const markSelector = document.querySelector("#markSelector");
const changeThemeCotainer = document.querySelector("#changeThemeCotainer");
const changeTheme = document.querySelector("#changeTheme");
const backOptionsBtn2 = document.querySelector("#backOptionsBtn2");

let keypressHandler;

const marks = ["O", "X"];

// Game Values
const game = new Game();

resetDom();

ShowMainMenu();

// ShowOptions();
// ShowchangeTheme();
// ShowChangeMarks();
// ShowMarkSelector();
// game.startGame()
// game.state.count++
// console.log(game.state.isDisplayed)

function ShowMainMenu() {
  changeVisibility(menu, "grid");

  menuStatus.textContent = "Menu";
  startBtn.removeEventListener("click", () =>
    game.startGame(marks[0], marks[1])
  );

  startBtn.addEventListener("click", () => {
    setTimeout(() => {
      changeVisibility(menu, "none");
      changeVisibility(menuStatusContainer, "none");
    }, 30);
    game.startGame(marks[0], marks[1]);
  });

  resetEventListener(optionsBtn, ShowOptions);
}

function ShowOptions() {
  changeVisibility(optionsContainer, "grid");
  menuStatus.textContent = "Options";

  resetEventListener(changeMarksBtn, ShowChangeMarks);
  resetEventListener(changeTheme, ShowchangeTheme);
  resetEventListener(backMainMenuBtn, ShowMainMenu);
}

function ShowChangeMarks() {
  changeVisibility(changeMarksCotainer, "grid");

  markBtns[0].textContent = marks[0];
  markBtns[1].textContent = marks[1];
  menuStatus.textContent = "Set Marks";

  resetEventListener(markBtns[0], () => {
    ShowMarkSelector(0);
  });

  resetEventListener(markBtns[1], () => {
    ShowMarkSelector(1);
  });

  resetEventListener(backOptionsBtn, ShowOptions);
}

function ShowMarkSelector(player) {
  markSelector.style.display = "flex";

  if (keypressHandler) {
    document.removeEventListener("keydown", keypressHandler);
  }

  keypressHandler = (event) => {
    const key = event.key;

    if (key === "Escape") {
      markSelector.style.display = "none";
      document.removeEventListener("keydown", keypressHandler);
      keypressHandler = null;
      return;
    }
    if (/^[a-zA-Z0-9]$/.test(key)) {
      marks[player] = key.toUpperCase();
      markSelector.style.display = "none";
      ShowChangeMarks();

      document.removeEventListener("keydown", keypressHandler);
      keypressHandler = null;
    }
  };

  document.addEventListener("keydown", keypressHandler);
}

function ShowchangeTheme() {
  changeVisibility(changeThemeCotainer, "grid");

  menuStatus.textContent = "Set Theme";

  const green = document.querySelector("#themeGreen");
  const blue = document.querySelector("#themeBlue");
  const red = document.querySelector("#themeRed");

  resetEventListener(green, () => {
    changeThemeExec("green");
  });
  resetEventListener(blue, () => {
    changeThemeExec("blue");
  });
  resetEventListener(red, () => {
    changeThemeExec("red");
  });

  resetEventListener(backOptionsBtn2, ShowOptions);
}

function changeThemeExec(theme) {
  const palettes = [
    {
      color: "green",
      background:
        "linear-gradient(45deg,rgba(55, 228, 50, 1) 0%,rgba(250, 235, 66, 0.448) 90%)",
      // buttons: 'green',
      // bacnBtn: 'green',
      // box: 'green',
      cell: "#4ae77f",
      hover: "#7FFFAA",
      // mark: 'green',
    },
    {
      color: "blue",
      background:
        "linear-gradient(45deg,rgb(50, 94, 228) 0%,rgba(250, 235, 66, 0.449) 90%)",
      // buttons: 'blue',
      // bacnBtn: 'red',
      // box: 'blue',
      cell: "#3b93ec",
      hover: "#b4d6f7",
      // mark: 'blue',
    },
    {
      color: "red",
      background:
        "linear-gradient(45deg,rgb(228, 50, 50) 0%,rgba(250, 235, 66, 0.448) 90%)",
      // buttons: 'red',
      // bacnBtn: 'red',
      // box: 'red',
      cell: "#f96d4f",
      hover: "#f7b4b7",
      // mark: 'red',
    },
  ];

  palettes.forEach((palette) => {
    if (palette.color === theme) {
      body.style.background = palette.background;
      // main.style.background = palette.background;
      game.cells.forEach((cell) => {
        cell.style.background = palette.cell;
        const style = document.createElement("style");
        style.innerHTML = `
    .cell:hover {
      background-color: ${palette.hover} !important;
    }
  `;
        document.head.appendChild(style);
      });
    }
  });
}

// Check Clicked Element
document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  console.log(clickedElement);
});
