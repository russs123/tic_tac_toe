// This is a module.
// Use a module because there is only one of these objects.
// Try to declare all variables in the function they need to be in.
const gameBoard = (() => {
    let boardData = 
    [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
    ];

    let player = 1;
    const grid = document.querySelectorAll(".cell");

    const init = () => {
      const submitBtn = document.querySelector(".submitBtn");
      // For some reason I have to hide the cells here.
      // Setting display none in css doesn't work.
      grid.forEach(cell => {
        cell.style.display = "none"
      });
      submitBtn.addEventListener('click', () => {
        hasFormBeenCompleted();
        players.init(playerOne.value, playerTwo.value);
      });
      const players = createPlayer();
      
      checkTurn();
    };

    const hasFormBeenCompleted = () => {
      const form = document.querySelector("#playerForm");
      if (validationCheck() == true) {
        form.style.display = "none";
        grid.forEach(cell => {
          cell.style.display = "";
        });
      };
    };
    
    // Validation check on both names.
    const validationCheck = () => {
      // Not really sure how this works as these variables are never declared.
      if (playerOne.value.match("^[A-Za-z]{1,100}") &&
          playerTwo.value.match("^[A-Za-z]{1,100}")) {
        return true
      } else {
        return false
      };
    };

    const takeTurn = (index) => {
        // Remainder by the square amount.
        // 4x4 = remainder 4.
        // 10x10 = remainder 10.
        let j = index % 3;
        // J is columns.
        // If cell 4 is 1, I = 4 - J (Which is 1 because it's the % of 4/3).
        // The reason for 4/3 is because we have a % 3.
        // 4 - J(1) = 3
        // I = 3/3
        let i = (index - j) / 3;
        // Check if the cell is empty
        if (boardData[i][j] == 0) {
          // Place current player marker in cell
          boardData[i][j] = player;
          // Change player
          if (player == 1) {
              player = 2
          } else {
              player = 1
          };
          // Update game board with markers
          drawMarkers();
          // Check to see if the game is over
          checkGameOver();
        };
    };

    // Function for checking which cell has been clicked
    const checkTurn = () => {
      grid.forEach((cell, index) => {
          cell.addEventListener('click', () => {
            takeTurn(index);
          });
      });
    };

    // Function for drawing the markers on the game board
    const drawMarkers = () => {
      const board = document.querySelector(".board");
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          if (boardData[i][j] == 1) {
            board.children[(i*3) + j].classList.add("x");
          } else if (boardData[i][j] == 2) {
            board.children[(i*3) + j].classList.add("circle");
          };
        };
      };
    };

    // Function to check the winner
    const checkGameOver = () => {
    };

    return {
      init
    };
})();


const createPlayer = () => {

    const updateScore = (winner) => {
      const playerOneScoreHtml = document.querySelector(".playerOneScore");
      const playerTwoScoreHtml = document.querySelector(".playerTwoScore");
      
      let playerOneScore = 0;
      let playerTwoScore = 0;

      playerOneScoreHtml.innerHTML = "Score: " + playerOneScore;
      playerTwoScoreHtml.innerHTML = "Score: " + playerTwoScore;

      if (winner == 1) {
        playerOneScore ++
      } else if (winner == 2) {
        playerTwoScore ++
      }
    };

    const init = (playerOneName, playerTwoName) => {
      const playerOneHtml = document.querySelector(".playerOneName");
      const playerTwoHtml = document.querySelector(".playerTwoName");
      playerOneHtml.innerHTML = playerOneName;
      playerTwoHtml.innerHTML = playerTwoName;
      updateScore();
    }

    return {updateScore, init}
};


// Draw game grid
gameBoard.init();

// Test area
