// Globabl Varibales
const gridItems = document.querySelectorAll('.boardSquare');

// Factory for players
const Player = (name, selection) => {
   return {name, selection};
};


const gameFlow = (() => {
   const player1 = Player('player1', 'O');
   const player2 = Player('player2', 'X');
   playerList = [player1, player2];
   let selection = playerList[1].selection;

   const nextTurn = () => {
      if (selection === playerList[0].selection) {
         selection = playerList[1].selection;
      } else {
         selection = playerList[0].selection;
      };
      return {selection};
   };

   return {nextTurn}
})();

// Tic Tac Toe gameboard 
const gameBoard = (() => {
    const board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
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
    const checkGame = () => {
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
         alert('You win');
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
            console.log('Game board', board);
            checkGame(list[i]);
         })
      };
    };

    return {addEventListenerList}
})();

gameBoard.addEventListenerList(gridItems, 'click')

