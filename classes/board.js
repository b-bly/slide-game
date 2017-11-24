class Board {
    constructor(piecesPerSide) {
        this.piecesPerSide = piecesPerSide;
        this.totalPieces = Math.pow(this.piecesPerSide, 2);
        this.piecesArray = [];
        this.draw();
    }
    draw() {
        const emptySquare = Math.floor(Math.random() * this.totalPieces);

        
        for (let j = 0; j < this.piecesPerSide; j++) {
            for (let i = 0; i < this.piecesPerSide; i++) {
                //    constructor(width, height, color, x, y, number) {
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
                const number = (i + 1) + (j * this.piecesPerSide);
                const empty = emptySquare == number;
                let piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                    x, y, number, empty);
                this.piecesArray.push(piece);
                if (empty == false) {
                    piece.update();
                }
            }
        }
    }
}
const PIECES_PER_SIDE = 5;
const PIECE_WIDTH = 50;
const PIECE_COLOR = 'blue';
const BOARD_MARGIN_Y = 50;
const PIECE_MARGIN = 10;
