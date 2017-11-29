class Piece {
    constructor(width, height, color, x, y, number, index, empty) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.number = number;
        this.index = index;
        this.empty = empty;

        //other variables
        this.click = true;
    }

    clicked() {
        const myleft = this.x;
        const myright = this.x + (this.width);
        const mytop = this.y;
        const mybottom = this.y + (this.height);
        this.click = true;
        if ((mybottom < game.y) || (mytop > game.y)
            || (myright < game.x) || (myleft > game.x)) {
            this.click = false;
        }
        if (this.click) {
            //console.log('clicked!');
            game.x = false;
            game.y = false;
        }
        return this.click;
    }

    isNextToEmpty(emptyPiece) {
        //from Board
        // const x = (i * (PIECE_WIDTH + PIECE_MARGIN));
        // const y = (PIECE_WIDTH + PIECE_MARGIN) * j + BOARD_MARGIN_Y;
        const leftX = this.x - (PIECE_WIDTH + PIECE_MARGIN);
        const leftY = this.y;
        const topX = this.x;
        const topY = this.y - (PIECE_WIDTH + PIECE_MARGIN);
        const rightX = this.x + (PIECE_WIDTH + PIECE_MARGIN);
        const rightY = this.y;
        const bottomX = this.x;
        const bottomY = this.y + (PIECE_WIDTH + PIECE_MARGIN);
        const adjacentPieces = [[leftX, leftY],
        [topX, topY],
        [rightX, rightY],
        [bottomX, bottomY]];
        let isEmpty = false;
        adjacentPieces.forEach((piece, i) => {
            if (piece[0] == emptyPiece.x && //gameBoard.emptySquare.x &&
                piece[1] == emptyPiece.y) { //gameBoard.emptySquare.y) {
                switch (i) {
                    case 0:
                        isEmpty = 'left';
                        break;
                    case 1:
                        isEmpty = 'top';
                        break;
                    case 2:
                        isEmpty = 'right';
                        break;
                    case 3:
                        isEmpty = 'bottom';
                        break;
                    default:
                        break;
                }
            }

        });
        return isEmpty;
    }

    animate(direction) {
        game.paused = true
        let dx = 0;
        let dy = 0;
        const pieceX = this.x;
        const pieceY = this.y;
        const pieceIndex = this.index;
        
        switch (direction) {
            case 'left':
                dx = -1;
                this.animateXorY('x', dx, dy, pieceX, pieceY, pieceIndex);
                break;
            case 'top':
                dy = -1;
                this.animateXorY('y', dx, dy, pieceX, pieceY, pieceIndex);
                break;
            case 'right':
                dx = 1;
                this.animateXorY('x', dx, dy, pieceX, pieceY, pieceIndex);
                break;
            case 'bottom':
                dy = 1;
                this.animateXorY('y', dx, dy, pieceX, pieceY, pieceIndex);
                break;
            default:
                break;
        }
        
    }
    animateXorY(xy, dx, dy, pieceX, pieceY, pieceIndex) {
        this.index = gameBoard.emptySquare.index;        
        gameBoard.emptySquare.x = pieceX;
        gameBoard.emptySquare.y = pieceY;
        gameBoard.emptySquare.index = pieceIndex;
        console.log('piece.animate emptySquare: ')
        console.log(gameBoard.emptySquare);
        for (let i = 0; i < PIECE_WIDTH + PIECE_MARGIN; i++) { 
            setTimeout(() => {
                xy == 'x'? this.x += dx : this.y += dy;
    
                game.clear();
                gameBoard.draw();
                console.log('piece.animate for loop');
    
            }, 10 * i); //animation rate ms
        }
        game.paused = false;
    }
    update() {
        //fill rectangle
        this.ctx = game.context;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //write font
        this.ctx.font = '20px Ariel';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        const x = this.x + PIECE_WIDTH / 2;
        const y = this.y + PIECE_WIDTH / 1.5;
        this.ctx.fillText(this.number.toString(), x, y);
    }
}

