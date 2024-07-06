let winner = false;
let draw = false;


//the gameboard where we will be checking for a winner, marking a square, and printing board
function GameBoard(){
  const board = ["","","","","","","","",""];
  const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];
  
  const getBoard = () => board;
  
  function markLocation(index,marker){
    if(board[index] === ""){
      board[index] = marker;
    }
  }
  
  function checkWinner(){
    for(let i = 0; i <= 7; i++){
      const location = winningConditions[i];
      let first = board[location[0]];
      let second = board[location[1]];
      let third = board[location[2]];
      if (first === '' || second === '' || third === '') {
        continue;
      }

      //since we are checking for 3 in a row, it makes sense to use the transitive property.
      if(first === second && second === third){
        winner = true;
        break;
      }
    }
  }
  
  function printBoard(){
    console.log(board);
  }
  return {getBoard, markLocation, printBoard,checkWinner};
}

//the logic where the game is being played.
function PlayGame(){
  let numTurns = 0;
  const players = [{name:"player_one", marker: "X"},{name:"player_two", marker:"O"}];
  const board = GameBoard();
  let currentPlayer = players[0];
  let switchPlayer = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  const getActivePlayer = () => currentPlayer;
  
  function newRound(){
    board.printBoard();
    console.log(getActivePlayer().name + "'s turn.");
  }
  
  function playRound(index){
    console.log(getActivePlayer().name + " is marking " + "(" + " index: " + index + ")");
    board.markLocation(index,getActivePlayer().marker);
    board.checkWinner();
    if(winner){
      board.printBoard();
      console.log(getActivePlayer().name + " wins!");
    }
    else if(numTurns === 8){
      board.printBoard();
      draw = true;
      console.log("The game ended in a draw");
    }
    else{
      switchPlayer();
      newRound();
      numTurns++;
    }
  }
  return {playRound,getActivePlayer, getBoard:board.getBoard};
}

function Display(){
  const game = PlayGame();
  const play_game = document.querySelector(".board");
  const turn = document.querySelector(".turn");
  const win = document.querySelector(".winner");
  
  //update dom each time a player made a move.
  function updateScreen(){
    const board = game.getBoard();
    const player = game.getActivePlayer();
    play_game.textContent = "";
    turn.textContent = player.name + "'s" + " turn";
    
    board.forEach((element,index) => {
      const block = document.createElement("div");
      block.classList.add("block");
      block.setAttribute("data-index", index);
      block.textContent = element;
      play_game.appendChild(block);
    })
    
    if(winner){
      win.textContent = player.name + " wins!";
    }
    else if(draw){
      win.textContent = "game ended in a draw";
    }
  }
  
  function updateBlock(event){
    game.playRound(event.target.dataset.index);
    updateScreen();
  }
  
  play_game.addEventListener("click",updateBlock);
  updateScreen();

  //there is no need to return anything since this function is encapsulated.
}

const ticTacToe = Display();