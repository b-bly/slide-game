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
        for (let j = 0; j < this.piecesPerSide; j++) {
            for (let i = 0; i < this.piecesPerSide; i++) {
                //    constructor(width, height, color, x, y, number) {
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
                const number = (i + 1) + (j * this.piecesPerSide);
                const empty = this.emptyNumber == number;
                let piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                    x, y, number, empty);
                this.piecesArray.push(piece);
                if (empty) this.emptySquare = piece;
            }
        }
    }

    draw () {
        this.piecesArray.forEach((piece, i) => {
            if (this.emptyNumber - 1 != i) {
                piece.update();
            } 
        });
    }
}
const PIECES_PER_SIDE = 5;
const PIECE_WIDTH = 50;
const PIECE_COLOR = 'blue';
const BOARD_MARGIN_Y = 50;
const PIECE_MARGIN = 10;
