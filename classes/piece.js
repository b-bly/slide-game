class Piece {
    constructor(width, height, color, x, y, boardX, boardY, number, index, empty) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.boardX = boardX;
        this.boardY = boardY;
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
            if (piece[0] == emptyPiece.x && //game.gameBoard.emptySquare.x &&
                piece[1] == emptyPiece.y) { //game.gameBoard.emptySquare.y) {
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
        
        //console.log('piece.animate emptySquare: ')
        //console.log(game.gameBoard.emptySquare);
        for (let i = 0; i < PIECE_WIDTH + PIECE_MARGIN; i++) { 
            setTimeout(() => {
                xy == 'x'? this.x += dx : this.y += dy;
    
                game.clear();
                game.gameBoard.draw();
                //console.log('piece.animate for loop');
                //last time through - update variables
                //need to update these variables here so that winner! message doesn't get
                //displayed until animation is done.
                if (i == PIECE_WIDTH + PIECE_MARGIN - 1) {
                    game.paused = false;
                    this.index = game.gameBoard.emptySquare.index;        
                    game.gameBoard.emptySquare.x = pieceX;
                    game.gameBoard.emptySquare.y = pieceY;
                    game.gameBoard.emptySquare.index = pieceIndex;
                }
            }, 10 * i); //animation rate ms
        }
        
    }
    update() {
        //fill rectangle
        this.ctx = game.context;
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = 'lightgray';
        roundRect(this.ctx, this.x, this.y, this.width, this.height, 5, true);
        //write number
        this.ctx.font = '20px Ariel';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        const x = this.x + PIECE_WIDTH / 2;
        const y = this.y + PIECE_WIDTH / 1.5;//doesn't center the number if it's 2 for some reason.
        this.ctx.fillText(this.number.toString(), x, y);
    }
}

//copied from https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
  }