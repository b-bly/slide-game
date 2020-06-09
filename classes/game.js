class Game {
    context;
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute('id', 'canvas');
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
        this.adminPaused = false;
        this.context = this.canvas.getContext("2d");

        this.canvasDiv = document.getElementById('canvasDiv');
        this.canvasDiv.appendChild(this.canvas);
        this.message = new Message('Shuffling');

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
            if (this.paused === false && this.adminPaused == false) { this.updateGame(); }
        }, UPDATE_RATE);
        this.message.setText('Shuffling');
        this.message.show();
        this.adminPaused = true;
        setTimeout(() => {
            this.gameBoard.shuffleBoard(SHUFFLE_MOVES);
            // unpaused in gameBoard
        }, 500);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkIfWon() {
        this.gameBoard.sortBoard()
        let emptyAdjustment = 0;
        let previous = null;
        for (let i = 0; i < this.gameBoard.piecesArray.length; i++) {
            const number = this.gameBoard.piecesArray[i].number;
            const piece = this.gameBoard.piecesArray[i];
            // let previous = i > 0 ? this.gameBoard.piecesArray[i - 1] : null;
            if (piece.empty === true) { emptyAdjustment = -1; }
            let correctNumber = i + 1 + emptyAdjustment;
            if (previous !== null) {
                if (previous.empty === true && i > 1) {
                    previous = this.gameBoard.piecesArray[i - 2];
                } 
                if (number !== correctNumber) { return 0; }
            }
            previous = i > 0 ? this.gameBoard.piecesArray[i - 1] : null;
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
        this.gameBoard.moveClickedPieces();
        //this.text = new Text('Slide puzzle', 110, 40, '30px Ariel', 'black');
        if (this.checkIfWon() == 1) {
            //won message
            this.clear();
            const centerx = this.canvas.width / 2;
            const centery = this.canvas.width / 2;
            this.message.setText('Winner!');
            this.message.show(); // Text('Winner!', centerx, centery, '20px Ariel', 'black');
            clearInterval(this.interval);
            setTimeout(() => {
                this.clear();
                this.message.hide();
                if (USER_DECIDES_SETTINGS === true) {
                    this.settings.mount();
                } else {
                    this.start();
                }
            }, 2000);

        } else {
            this.gameBoard.draw();
        }
    }

}

