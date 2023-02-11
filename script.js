// Globabl Varibales
const gridItems = document.querySelectorAll('.boardSquare');

// Tic Tac Toe gameboard 
const gameBoard = (() => {
    const board = [[], [], []]
    
    // Identifies the position where the player's move is made, returns the row,column index. 
    const getGridPosition = (gridItem) => {
      const row = Number(gridItem.dataset.row);
      const column = Number(gridItem.dataset.column);
      return [row, column]
    };

    // Assigns the player's selection from the DOM to the board array. 
    const assignBoardPosition = (gridItem, position) => {
      board[position[0]][position[1]] = gridItem.textContent;
    };

    //const checkGame = 
    const addEventListenerList = (list, eventType) => {
      for (let i=0; i < list.length; i++) {
         list[i].addEventListener(eventType, () => {
            if (list[i].textContent == '') {
               list[i].textContent = 'X'
            } else {
               list[i].textContent = ''
            };
            assignBoardPosition(list[i], getGridPosition(list[i]));
         })
      };
      
    }

    return {addEventListenerList}
})();

gameBoard.addEventListenerList(gridItems, 'click');


// Factory for players
const Player = (name, selection) => {
   return {name, move};
};


