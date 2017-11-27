class Game {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.initialize();

    }
    initialize() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.frameNo = 0;
        this.x = false;
        this.y = false;
        this.paused = false;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    }

    togglePause() {
        if (!this.paused) {
            this.paused = true;
            console.log('paused');
            
        } else if (this.paused) {
            this.paused = false;
        }
    }

    start() {
        //this.text = new Text('Slide puzzle', 40, 40, '30px Ariel', 'black');
        window.addEventListener('mouseup', (e) => {
            this.x = e.pageX;
            this.y = e.pageY;
             console.log('eventListener');
            console.log(this.x, this.y);
        });
        //https://stackoverflow.com/questions/43814422/how-to-pause-simple-canvas-game-made-with-js-and-html5
        window.addEventListener('keypress', (e) => {
            const key = e.keyCode;
            console.log('key: ', key);
            
            if (key === 112)// p key
            {
                this.togglePause();
            }

        });
        this.interval = setInterval(() => {
            if (this.paused == false) this.updateGame();
        }, 300);
        
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    updateGame() {
        this.clear();
        gameBoard.piecesArray.forEach((piece, i) => {
            if (piece.clicked() == true) {
                console.log('emptySquare: ');
                console.log(gameBoard.emptySquare);
                console.log('piece clicked x: ', piece.x, 'y: ', piece.y);
                console.log('empty x: ', gameBoard.emptySquare.x, 'y: ', gameBoard.emptySquare.y);
                
                
                if (piece.isNextToEmpty(gameBoard.emptySquare)) {
                    //switch spaces
                    console.log('isnexttoempty == true');
                    
                    const empty = Object.assign({}, gameBoard.emptySquare);
                    gameBoard.emptySquare.x = piece.x;
                    gameBoard.emptySquare.y = piece.y;
                    gameBoard.piecesArray[i].x = empty.x;
                    gameBoard.piecesArray[i].y = empty.y;
                }
            }
        });
        //this.text = new Text('Slide puzzle', 110, 40, '30px Ariel', 'black');
        
        gameBoard.draw();
        
    }

}

