class Game {
    context;
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = 'canvas';
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

        this.canvasDiv = document.getElementById('canvasDiv');
        this.canvasDiv.appendChild(this.canvas);

        // if settings used to start game, then uncomment this
        if (USER_DECIDES_SETTINGS) {
            this.settings = new Settings();
        } else {
            // setTimeout(() => {
                this.start();
            // }, 1000);
        }
    }

    togglePause() {
        if (!this.paused) {
            this.paused = true;

        } else if (this.paused) {
            this.paused = false;
        }
    }

    start() {
        this.canvas.width = PIECES_PER_SIDE * PIECE_WIDTH + (PIECES_PER_SIDE - 1) * PIECE_MARGIN;
        window.addEventListener('mouseup', (e) => {
            let coords = this.canvas.getBoundingClientRect();
            this.x = e.pageX - coords.x;
            this.y = e.pageY - coords.y;
        });
        //https://stackoverflow.com/questions/43814422/how-to-pause-simple-canvas-game-made-with-js-and-html5

        window.addEventListener('keydown', (e) => {
            this.key = e.keyCode;
            if (this.key == 80) { // p key 
                this.togglePause();
            }
        })
        this.gameBoard = new Board(PIECES_PER_SIDE);

        this.interval = setInterval(() => {
            if (this.paused === false) { this.updateGame(); }
        }, UPDATE_RATE);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkIfWon() {
        //sort based on index
        this.gameBoard.piecesArray.sort((a, b) => {
            return a.index - b.index;
        });
        for (let i = 0; i < this.gameBoard.piecesArray.length; i++) {
            const number = this.gameBoard.piecesArray[i].number;
            const piece = this.gameBoard.piecesArray[i];
            //don't need to check empty square
            if (piece.empty == false) {
                if (i + 1 !== number) {
                    return 0; //at least one pair of pieces is out of order
                    // 0 = not won yet
                }
            }
        }
        return 1; // = won
    }

    updateGame() {
        this.clear();
        //key events
        if (this.key == 78) { //n key
            //new game
            this.gameBoard.create();
            this.key = false;
        }

        //click on tile event: move tiles
        this.gameBoard.piecesArray.forEach((piece, i) => {
            if (piece.clicked() == true &&
                piece.empty == false) {
                // console.log('emptySquare: ');
                // console.log(this.gameBoard.emptySquare);
                // console.log('piece clicked x: ', piece.x, 'y: ', piece.y);
                // console.log('empty x: ', this.gameBoard.emptySquare.x, 'y: ', this.gameBoard.emptySquare.y);
                const direction = piece.isNextToEmpty(this.gameBoard.emptySquare);
                if (direction != false) {
                    //animate move
                    this.paused = true;
                    piece.animate(direction);

                }
            }

        });
        //this.text = new Text('Slide puzzle', 110, 40, '30px Ariel', 'black');
        if (this.checkIfWon() == 1) {
            //won message
            this.clear();
            const centerx = this.canvas.width / 2;
            const centery = this.canvas.width / 2;
            this.message = new Text('Winner!', centerx, centery, '20px Ariel', 'black');
            clearInterval(this.interval);
            setTimeout(() => {
                this.clear();
                this.settings.mount();
            }, 2000);

        } else {
            this.gameBoard.draw();
        }
    }

}

