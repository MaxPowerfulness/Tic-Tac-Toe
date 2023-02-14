// Globabl Varibales
const gridItems = document.querySelectorAll('.boardSquare');
const clearBtn = document.querySelector('#boardClearBtn')

// Factory for players
const Player = (name, selection) => {
   return {name, selection};
};

// Initializes the players and allows for alternating turns between players to occur.
const gameFlow = (() => {
   const player1 = Player('Player 1', 'O');
   const player2 = Player('Player 2', 'X');
   playerList = [player1, player2];
   let selection = playerList[1].selection;

   // Alternates the marker that is placed after one is placed. 
   const nextTurn = () => {
      if (selection === playerList[0].selection) {
         selection = playerList[1].selection;
         
      } else {
         selection = playerList[0].selection;
      };
      return {selection};
   };
   return {nextTurn, playerList, selection};
})();

// Tic Tac Toe gameboard 
const gameBoard = (() => {
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // Identifies the position where the player's move is made, returns the row,column index. 
    const getGridPosition = (gridItem) => {
      const row = Number(gridItem.dataset.row);
      const column = Number(gridItem.dataset.column);
      return [row, column];
    };

    // Assigns the player's selection from the DOM to the board array. 
    const assignBoardPosition = (gridItem, position) => {
      board[position[0]][position[1]] = gridItem.textContent;
    };

   // Checks to see if the game has been won by a player.
    const checkGame = (playerSelection) => {
      let oneTwoThree = [board[0][0], board[0][1], board[0][2]];
      let oneFourSeven = [board[0][0], board[1][0], board[2][0]];
      let oneFiveNine = [board[0][0], board[1][1], board[2][2]];
      let twoFiveEight = [board[0][1], board[1][1], board[2][1]];
      let threeSixNine = [board[0][2], board[1][2], board[2][2]];
      let threeFiveSeven = [board[0][2], board[1][1], board[2][0]];
      let fourFiveSix = [board[1][0], board[1][1], board[1][2]];
      let sevenEightNine = [board[2][0], board[2][1], board[2][2]];
      if (oneTwoThree.every(i => i === oneTwoThree[0]) | oneFourSeven.every(i => i === oneFourSeven[0]) | oneFiveNine.every(i => i === oneFiveNine[0]) | 
      twoFiveEight.every(i => i === twoFiveEight[0]) | threeSixNine.every(i => i === threeSixNine[0]) | threeFiveSeven.every(i => i === threeFiveSeven[0]) | 
      fourFiveSix.every(i => i === fourFiveSix[0]) | sevenEightNine.every(i => i === sevenEightNine[0])) {
         if (playerSelection === "O") {
            alert(`${gameFlow.playerList[0].name} wins`)
         } else {
            alert(`${gameFlow.playerList[1].name} wins`);
         }
      };
    };

   // Resets the DOM grid and the board array back to default values.
    const resetGame = () => {
      board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      for (let i = 0; i < gridItems.length; i++) {
         gridItems[i].textContent = '';
      };
      console.log(gameFlow.nextTurn().selection);
      // Ensures that Player 1 ('O') always plays first. 
      if (gameFlow.nextTurn().selection === 'O') { 
         gameFlow.nextTurn();
      };
    };

    // When a grid item is clicked, then turn order alternates, the player's selection (x or o) is assinged to the DOM, and assigned to the board array.
    const addEventListenerList = (list, eventType) => {
      for (let i=0; i < list.length; i++) {
         list[i].addEventListener(eventType, () => {
            if (list[i].textContent !== '') {
               return;
            };
            let choice = gameFlow.nextTurn() // Changes the players turn each iteration
            if (list[i].textContent == '') {
               list[i].textContent = choice.selection;
            };
            assignBoardPosition(list[i], getGridPosition(list[i]));
            checkGame(choice.selection);
         })
      };
    };
    return {addEventListenerList, resetGame}
})();

// Event Listeners 
gameBoard.addEventListenerList(gridItems, 'click')
clearBtn.addEventListener('click', gameBoard.resetGame);
