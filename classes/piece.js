class Piece {
    constructor(width, height, color, x, y, number, empty) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.number = number;
        this.empty = empty;
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
            console.log('clicked!');
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
                    isEmpty = true;
                }
                
        });
        return isEmpty;
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