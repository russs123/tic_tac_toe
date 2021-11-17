// This is a module.
// Use a module because there is only one of these objects.
const gameBoard = (() => {
    let boardData = 
    [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
    ]

    let player = 1;

    const grid = document.querySelectorAll(".cell");
    const board = document.querySelector(".board");

    const init = () => {
        checkTurn();
    }

    const takeTurn = (index) => {
        let player = playerFactory(1);
        // Remainder by the square amount.
        // 4x4 = remainder 4.
        // 10x10 = remainder 10.
        let j = index % 3
        // J is columns.
        // If cell 4 is 1, I = 4 - J (Which is 1 because it's the % of 4/3).
        // The reason for 4/3 is because we have a % 3.
        // 4 - J(1) = 3
        // I = 3/3
        let i = (index - j) / 3
        // Check if the cell is empty
        if (boardData[i][j] == 0) {
          // Place current player marker in cell
          boardData[i][j] = player;
          // Change player
          if (player == 1) {
              player = 2
          } else {
              player = 1
          }
          // Update game board with markers
          drawMarkers();
          // Check to see if the game is over
          checkGameOver();
        }
    }

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
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          if (boardData[i][j] == 1) {
            board.children[(i*3) + j].classList.add("x");
          } else if (boardData[i][j] == 2) {
            board.children[(i*3) + j].classList.add("circle");
          };
        }
      }
    }

    // Function to check the winner
    const checkGameOver = () => {
      console.log('you win');
    }

    return {
      init
    };
})();


const playerFactory = (number) => {
    return number
};

// Draw game grid
gameBoard.init();

// Test area
