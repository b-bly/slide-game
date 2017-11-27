class Board {
    constructor(piecesPerSide) {
        this.piecesPerSide = piecesPerSide;
        this.totalPieces = Math.pow(this.piecesPerSide, 2);
        this.piecesArray = [];
        this.emptyNumber = Math.floor(Math.random() * this.totalPieces) + 1;
        this.emptySquare = {};
        this.create();
        this.draw()
    }

    create() {
        //create random numbers array.
        const randomArray = [];
        const numberOfSquares = this.piecesPerSide * this.piecesPerSide;
        for (let i = 0; i < numberOfSquares; i++) {
            let rand = Math.floor(Math.random() * this.totalPieces) + 1;
            while (randomArray.includes(rand)) {
                rand = Math.floor(Math.random() * this.totalPieces) + 1;
            }
            randomArray.push(rand);
        }

        for (let j = 0; j < this.piecesPerSide; j++) {
            for (let i = 0; i < this.piecesPerSide; i++) {
                //    constructor(width, height, color, x, y, number) {
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
                const number = randomArray.pop();
                const empty = this.emptyNumber == number;
                const piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                    x, y, number, empty);
                             this.piecesArray.push(piece);
                if (empty) {
                    this.emptySquare = Object.assign({}, piece);
                }
            }
        }
    }

    draw() {
        this.piecesArray.forEach((piece, i) => {
            if (piece.empty == false) {
                piece.update();
            }
        });
    }
}

