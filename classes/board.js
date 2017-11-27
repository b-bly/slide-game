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
        const randomArray = [this.emptyNumber];
        const numberOfSquares = this.piecesPerSide * this.piecesPerSide - 1;
        for (let i = 0; i < numberOfSquares; i++) {
            let rand = Math.floor(Math.random() * this.totalPieces) + 1;
            while (randomArray.includes(rand)) {
                rand = Math.floor(Math.random() * this.totalPieces) + 1;
            }
            randomArray.push(rand);
        }

        for (let j = 0; j < this.piecesPerSide; j++) {
            for (let i = 0; i < this.piecesPerSide; i++) {
                let counter = 0;
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
                    console.log('the empty created ');
                    console.log(this.emptySquare);
                    
                    
                }
                if (j == this.piecesPerSide - 1 && i == this.piecesPerSide - 1) {
                    console.log('last square: ');
                    
                    console.log('last square: ', piece);
                    
                }
                counter++;
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
const PIECES_PER_SIDE = 5;
const PIECE_WIDTH = 50;
const PIECE_COLOR = 'blue';
const BOARD_MARGIN_Y = 50;
const PIECE_MARGIN = 10;
