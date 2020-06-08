class Settings {
    constructor() {
        this.mount();
    }

    mount() {
        //Board size stuff
        const html = '<div class="container">' +
        
            '<div class=""><label>Board width:</label>' +
            '<input type="text" name="boardSize" id="boardSize"> <span>squares</span></div>' +
            '<div class=""> </div>' +
            '<div class=""><button class="btn btn-primary" id="submit">New game</button></div>' +
            '</div>';
            
        let newNode = document.createElement('div');
        newNode.id = 'settings';
        newNode.innerHTML = html;
        const referenceNode = document.getElementById('canvasDiv');
        this.content = document.body.insertBefore(newNode, referenceNode);
        document.getElementById("submit").addEventListener("click", this.submit);
           }

    submit() {
        PIECES_PER_SIDE = document.getElementById('boardSize').value;
        removeEl();
        game.canvas.width = PIECES_PER_SIDE * PIECE_WIDTH + (PIECES_PER_SIDE - 1) * PIECE_MARGIN;
        game.start();
    }
    test() {
        game.gameBoard.shuffleBoard();
    }
}
function removeEl() {
    const parent = document.body;
    const child = document.getElementById('settings');    
    parent.removeChild(child);
}