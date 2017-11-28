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
        this.key = false;
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
            console.log('unpaused');

        }
    }

    start() {
        this.text = new Text('Slide puzzle', 40, 40, '30px Ariel', 'black');
        window.addEventListener('mouseup', (e) => {
            this.x = e.pageX;
            this.y = e.pageY;
            console.log('eventListener');
            console.log(this.x, this.y);
        });
        //https://stackoverflow.com/questions/43814422/how-to-pause-simple-canvas-game-made-with-js-and-html5

        window.addEventListener('keydown', (e) => {
            this.key = e.keyCode;
            console.log('key pressed: ', this.key);
            if (this.key == 80) { // p key 
                console.log('p key pressed');

                this.togglePause();
            }
        })
        this.interval = setInterval(() => {
            if (this.paused == false) this.updateGame();
        }, UPDATE_RATE);

    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkIfWon() {
        const result = gameBoard.piecesArray.reduce(function (acc, piece, i) {
            if (piece.empty == false) {
                if (i + 1 == piece.number) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 1;
            }
        }, 0);
        return result;
    }

    updateGame() {
        this.clear();
        //key events
        if (this.key == 78) { //n key
            //new game
            console.log('n key pressed')
            gameBoard.create();
            this.key = false;
        }

        //click on tile event: move tiles
        gameBoard.piecesArray.forEach((piece, i) => {
            if (piece.clicked() == true) {
                console.log('emptySquare: ');
                console.log(gameBoard.emptySquare);
                console.log('piece clicked x: ', piece.x, 'y: ', piece.y);
                console.log('empty x: ', gameBoard.emptySquare.x, 'y: ', gameBoard.emptySquare.y);
                const direction = piece.isNextToEmpty(gameBoard.emptySquare);
                if (direction != false) {
                    //switch spaces
                    console.log('isnexttoempty is not false');
                    //pause and animate piece
                    //need to know if it's left right top or bottom
                    piece.animate(direction);
                    // const empty = Object.assign({}, gameBoard.emptySquare);
                    // gameBoard.emptySquare.x = piece.x;
                    // gameBoard.emptySquare.y = piece.y;
                    // gameBoard.piecesArray[i].x = empty.x;
                    // gameBoard.piecesArray[i].y = empty.y;
                }
            }

        });
        this.text = new Text('Slide puzzle', 110, 40, '30px Ariel', 'black');
        if (this.checkIfWon() == 1) {
            //won message
            this.message = new Text('Winner!', 200, 40, '10px Ariel', 'black');
        } else {
            gameBoard.draw();
        }
    }

}

