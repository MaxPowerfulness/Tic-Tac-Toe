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
      console.log('selection', selection)
      return {selection};
   };

   return {nextTurn}
})();

// Tic Tac Toe gameboard 
const gameBoard = (() => {
    const board = [[], [], []]

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
    const checkGame = (gridItem) => {
      //console.log('position', getGridPosition(gridItem)) // Why is it returning an object and not an array???
      //console.log({0: 0, 1: 0} == getGridPosition(gridItem));
      //console.log('Data type', typeof getGridPosition(gridItem));
      switch (getGridPosition(gridItem)) {
         case [0, 0]:
            if (((board[0][0] & board[0][1] & board[0][2]) === 'X') | ((board[0][0] & board[1][0] & board[2][0]) === 'X') | ((board[0][0] & board[1][1] & board[2][2]) === 'X')) {
               alert('You win');
            };
            break;
         case [0, 1]:
            if (((board[0][0] & board[0][1] & board[0][2]) === 'X') | (([0][1] & [1][1] & [2][1]) === 'X')) {
               alert('You win');
            };
            break;
         case [0, 2]:
            if (((board[0][0] & board[0][1] & board[0][2]) === 'X') | ((board[0][2] & board[1][2] & board[2][2]) === 'X') | ((board[0][0] & board[1][1] & board[2][0]) === 'X')) {
               alert('You win');
            };
            break;
         case [1, 0]:
            if (((board[0][0] & board[1][0] & board[2][0]) === 'X') | ((board[0][2] & board[1][2] & board[2][2]) === 'X') | ((board[0][0] & board[1][1] & board[2][0]) === 'X')) {
               alert('You win');
            };
            break;
      };
    };

    const addEventListenerList = (list, eventType) => {
      for (let i=0; i < list.length; i++) {
         list[i].addEventListener(eventType, () => {
            let choice = gameFlow.nextTurn() // Changes the players turn each iteration
            if (list[i].textContent == '') {
               list[i].textContent = choice.selection;
            };
            assignBoardPosition(list[i], getGridPosition(list[i]));
            
            //checkGame(list[i]);
         })
      };
    };

    return {addEventListenerList}
})();

gameBoard.addEventListenerList(gridItems, 'click')


