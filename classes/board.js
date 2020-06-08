class Board {
    moves = 0;
    piecesArray = [];
    emptySquare = {};
    twoDPiecesArray = [];
    totalPieces = Math.pow(PIECES_PER_SIDE, 2);
    emptyNumber = 0;
   
    constructor() {
        this.create();
        this.drawIfGameIsReady();  
    }

    createTestBoard() {
        //Easy board for testing:

        const randomArray = [0, 1, 2, 3];
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 2; i++) {
                //    constructor(width, height, color, x, y, number) {
                const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
                const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
                const empty = (j * 2 + i) == 0;
                const index = i + j * 2;
                if (empty) {
                    this.emptySquare = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                        x, y, this.emptyNumber, index, empty);
                    randomArray.shift();
                } else {
                    const number = randomArray.shift();
                    const piece = new Piece(PIECE_WIDTH, PIECE_WIDTH, PIECE_COLOR,
                        x, y, number, index, empty);
                    this.piecesArray.push(piece);
                }
            }
        }
    }

    getRandomBoardArray() {
        const randomArray = [];
        this.emptyNumber = Math.floor(Math.random() * this.totalPieces);

        for (let i = 0; i < this.totalPieces - 1; i++) { //one less than total pieces because the 
            //empty is always assigned the highest number
            let rand = Math.floor(Math.random() * (this.totalPieces - 1)) + 1;
            while (randomArray.includes(rand)) {
                rand = Math.floor(Math.random() * (this.totalPieces - 1)) + 1;
            }
            randomArray.push(rand);
        }
        return randomArray;
    }

    getBoardArrayInOrder() {
        const orderedArray = [];
        for (let i = 0; i < this.totalPieces - 1; i++) { //one less than total pieces because the 
            orderedArray.push(i);
        }
        return orderedArray.reverse();
    }

    create() {
        //create random numbers array.

        const randomArray = this.getRandomBoardArray();

        //0 for empty square

        for (let j = 0; j < PIECES_PER_SIDE; j++) {
            const row = [];
            for (let i = 0; i < PIECES_PER_SIDE; i++) {
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

    drawIfGameIsReady() {
        if (game) {
            this.draw();
        } else {
            setTimeout(() => {
                this.drawIfGameIsReady();
            }, 500);
        }
    }

    makeRandomMove() {
        // this.piecesArray.sort((a, b) => {
        //     return a.index - b.index;
        // });
        // const twoDPiecesArray = [];
        // for (let j = 0; j < PIECES_PER_SIDE; j++) {
        //     const row = [];
        //     for (let i = 0; i < PIECES_PER_SIDE; i++) {
        //         row.push(this.piecesArray[i + j]);
        //     }
        //     twoDPiecesArray.push(row);
        // }
        const emptyIndex = this.emptySquare.index;
        const emptyX = emptyIndex % PIECES_PER_SIDE;
        const emptyY = Math.floor(emptyIndex / PIECES_PER_SIDE);
        const possibleMoves = [];

        // add all possible moves

        if (emptyY > 0) possibleMoves.push(DOWN);
        if (emptyY < PIECES_PER_SIDE - 1) possibleMoves.push(UP);
        if (emptyX > 0) possibleMoves.push(RIGHT);
        if (emptyX < PIECES_PER_SIDE - 1) possibleMoves.push(LEFT);
        // console.log(possibleMoves);

        //assign random move

        const random = Math.floor(Math.random() * possibleMoves.length);
        const direction = possibleMoves[random];
        let piece;
        switch (direction) {
            case DOWN: //perspective of piece that will move not empty
                piece = this.piecesArray[emptyIndex - PIECES_PER_SIDE];
                break;
            case UP:
                piece = this.piecesArray[emptyIndex + PIECES_PER_SIDE]; //need to adjust down and
                //right if you take empty out of pieces array by - 1

                break;
            case LEFT:
                piece = this.piecesArray[emptyIndex + 1];
                break;
            case RIGHT:
                piece = this.piecesArray[emptyIndex - 1];
                break;
        }
        // setTimeout(() => {
            piece.animate(direction, true);
        // }, 100);
    }

    shuffleBoard(moves) {
        this.moves = moves;
        this.makeRandomMove();
        this.moves --;
    
    }

    continueShufflingBoard() {
        if (this.moves > 0) {
            this.moves --;
            this.makeRandomMove();
        } else {
            game.message.hide();
        }
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

        // https://www.kopf.com.br/kaplof/how-to-solve-any-slide-puzzle-regardless-of-its-size/

    }
}

