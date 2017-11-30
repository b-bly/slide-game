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
    
}

document.getElementById("submit").addEventListener("click", submit);

function submit() {
     PIECES_PER_SIDE = document.getElementById('boardSize').value;
    console.log('pieces per side: ');
    console.log(PIECES_PER_SIDE);
    let rect = game.canvasDiv.getBoundingClientRect();
    console.log('canvasDiv');
    console.log(rect);
    
}

//window.onload = function () {

//}