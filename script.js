//PLAN

//draw 5 x 5 board.
//one empty square
//add numbers
//randomly generate board

let game, gameBoard;

function startGame() {
    game = new Game();
    game.start();
    //let text = new Text('Slide puzzle', 40, 40, '30px Ariel', 'black');
    gameBoard = new Board(PIECES_PER_SIDE);
    console.log('board piecesArray');
    console.log(gameBoard.piecesArray);
    console.log('clicked');
    console.log(gameBoard.piecesArray[1].clicked());
    
    
}

//window.onload = function () {

//}