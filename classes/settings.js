class Settings {
    constructor() {
        this.example = 'example';
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
       
        //testing button
        document.getElementById("testing").addEventListener("click", this.test);
    }
    removeEl() {
        console.log('unmount called');

        // const parent = document.body;
        // const child = document.getElementById('settings');
        //parent.removeChild(child);
    }
    submit() {
        PIECES_PER_SIDE = document.getElementById('boardSize').value;
        console.log('pieces per side: ');
        console.log(PIECES_PER_SIDE);
        removeEl();
        game.canvas.width = PIECES_PER_SIDE * PIECE_WIDTH + (PIECES_PER_SIDE - 1) * PIECE_MARGIN;
        game.start();

    }
    test() {
        console.log(game.gameBoard.shuffleBoard);
        game.gameBoard.shuffleBoard();
    }
}
function removeEl() {
    console.log('removeEl called');
    const parent = document.body;
    const child = document.getElementById('settings');
    console.log(child);
    
    parent.removeChild(child);
}