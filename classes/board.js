class Board {
    constructor(piecesPerSide) {
        this.piecesPerSide = piecesPerSide;
        this.totalPieces = Math.pow(this.piecesPerSide, 2);
        this.piecesArray = [];
        this.draw();
    }
    draw() {
        for (let j = 0; j < this.piecesPerSide; j++) {
            for (let i = 0; i < this.piecesPerSide; i++) {
                //    constructor(width, height, color, x, y, number) {
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y; 
                let piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                    x, y,
                    (i + 1) * (j + 1));
                this.piecesArray.push(piece);
                piece.update();
            }
        }

    }
}
const PIECES_PER_SIDE = 5;
const PIECE_WIDTH = 50;
const PIECE_COLOR = 'blue';
const BOARD_MARGIN_Y = 50;
const PIECE_MARGIN = 10;
