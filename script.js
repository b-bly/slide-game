//PLAN

//draw 5 x 5 board.
//one empty square
//add numbers
//randomly generate board
//clickable squares
//move clicked square to empty space if it is adjacent to it.

let game, gameBoard;

function startGame() {
    game = new Game();
    game.start();
    gameBoard = new Board(PIECES_PER_SIDE); 
    

}

//window.onload = function () {

//}