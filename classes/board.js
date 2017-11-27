class Board {
    constructor(piecesPerSide) {
        this.piecesPerSide = piecesPerSide;
        this.totalPieces = Math.pow(this.piecesPerSide, 2);
        this.piecesArray = [];
        this.emptyIndex = Math.floor(Math.random() * this.totalPieces);
        this.emptySquare = {};
        this.create();
        this.draw()
    }

    create() {
        //create random numbers array.
        const randomArray = [];

        for (let i = 0; i < this.totalPieces - 1; i++) {
            let rand = Math.floor(Math.random() * (this.totalPieces - 1)) + 1;
            while (randomArray.includes(rand)) {
                rand = Math.floor(Math.random() * (this.totalPieces - 1)) + 1;
            }
            randomArray.push(rand);
        }
        console.log('randomArray: ', randomArray);
        
        //0 for empty square
        

        for (let j = 0; j < this.piecesPerSide; j++) {
            for (let i = 0; i < this.piecesPerSide; i++) {
                //    constructor(width, height, color, x, y, number) {
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
                const empty = (j * this.piecesPerSide + i) == this.emptyIndex;
                if (empty) {
                    this.emptySquare = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                        x, y, this.emptyIndex, empty);
                } else {
                    const number = randomArray.pop();
                    const piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                        x, y, number, empty);
                    this.piecesArray.push(piece);
                    
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

