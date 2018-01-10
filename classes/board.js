class Board {
    constructor() {
        this.totalPieces = Math.pow(PIECES_PER_SIDE, 2);
        this.piecesArray = [];
        this.emptyNumber = Math.floor(Math.random() * this.totalPieces);
        this.emptySquare = {};
        this.twoDPiecesArray = [];
        this.create();
        this.draw()
    }

    create() {
        //Easy board for testing:
        // const randomArray = [0, 1, 2, 3];
        // for (let j = 0; j < 2; j++) {
        //     for (let i = 0; i < 2; i++) {
        //         //    constructor(width, height, color, x, y, number) {
        //         const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
        //         const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
        //         const empty = (j * 2 + i) == 0;
        //         const index = i + j * 2;
        //         if (empty) {
        //             this.emptySquare = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
        //                 x, y, this.emptyNumber, index, empty);
        //                 randomArray.shift();
        //         } else {
        //             const number = randomArray.shift();
        //             const piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
        //                 x, y, number, index, empty);
        //             this.piecesArray.push(piece);
        //         }
        //     }
        // }

        //create random numbers array.
        const randomArray = [];

        for (let i = 0; i < this.totalPieces - 1; i++) { //one less than total pieces because the 
            //empty is always assigned the highest number
            let rand = Math.floor(Math.random() * (this.totalPieces - 1)) + 1;
            while (randomArray.includes(rand)) {
                rand = Math.floor(Math.random() * (this.totalPieces - 1)) + 1;
            }
            randomArray.push(rand);
        }
        console.log('randomArray: ', randomArray);
        //0 for empty square
        for (let j = 0; j < PIECES_PER_SIDE; j++) {
            const row = [];
            for (let i = 0; i < PIECES_PER_SIDE; i++) {
                //    constructor(width, height, color, x, y, number) {
                const boardX = i;
                const boardY = j;
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const empty = (j * PIECES_PER_SIDE + i) == this.emptyNumber;
                const index = i + j * PIECES_PER_SIDE;
                if (empty) {
                    this.emptySquare = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                        x, y, boardX, boardY, this.emptyNumber, index, empty);
                    this.piecesArray.push(this.emptySquare);
                    //don't include empty unless you want to update the position in piece.animate
                    row.push(this.emptySquare);
                } else {
                    const number = randomArray.pop();
                    const piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                        x, y, boardX, boardY, number, index, empty);
                    this.piecesArray.push(piece);
                    row.push(piece);
                }
            }
            this.twoDPiecesArray.push(row);
        }
    }

    draw() {
        this.piecesArray.forEach((piece, i) => {
            if (piece.empty == false) {
                piece.update();
            }
        });
    }

    shuffleBoard() {
        this.piecesArray.sort((a, b) => {
            return a.index - b.index;
        });
        const twoDPiecesArray = [];
        for (let j = 0; j < PIECES_PER_SIDE; j++) {
            const row = [];
            for (let i = 0; i < PIECES_PER_SIDE; i++) {
                row.push(this.piecesArray[i + j]);
            }
            twoDPiecesArray.push(row);
        }
        const emptyIndex = this.emptySquare.index;
        const emptyX = emptyIndex % PIECES_PER_SIDE;
        const emptyY = Math.floor(emptyIndex / PIECES_PER_SIDE);
        //randome move -- select piece above, below or side of empty.
        const possibleMoves = [];
        //check possible moves
        if (emptyY > 0) possibleMoves.push('up');
        if (emptyY < PIECES_PER_SIDE - 1) possibleMoves.push('bottom');
        if (emptyX > 0) possibleMoves.push('left');
        if (emptyX < PIECES_PER_SIDE - 1) possibleMoves.push('right');
        //assign random move
        const random = Math.floor(Math.random() * possibleMoves.length);
        const direction = possibleMoves[random];
        let piece;
        switch (direction) {
            case 'down': //perspective of piece that will move not empty
                piece = this.piecesArray[emptyIndex - PIECES_PER_SIDE];
                break;
            case 'up':
                piece = this.piecesArray[emptyIndex + PIECES_PER_SIDE]; //need to adjust down and
                //right if you take empty out of pieces array by - 1
                break;
            case 'left':
                piece = this.piecesArray[emptyIndex + 1];
                break;
            case 'right':
                piece = this.piecesArray[emptyIndex - 1];
                break;
        }
        //animate the piece.
        piece.animate(direction);
        //update TwoDBoardArray -- easier to generate a 2D array from this.piecesArray than
        //to update it every move?
    }

    solve() {
        //GAME AI
        //VARIABLES:
        //this.emptySquare x, y, xRel, yRel: need to keep track of empty location
        //piece.xRel, yRel: may need to store relative x, y coords not pixel
        //boardAray: store boardArray as 2d version of piecesArray
        //this.nextNumber

        //STEPS
        //loop throught boardArr to find nextNumber (start with 1)

        //AI STRATEGY
        //solve
        //first row
        //first column
        //second row...
        //when 4 squares remain, just rotate empty

    }
}

