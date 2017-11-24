class Piece {
    constructor(width, height, color, x, y, number, empty) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.number = number;
        this.empty = empty;
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
        const x = this.x + PIECE_WIDTH/2;
        const y = this.y + PIECE_WIDTH/1.5;
        this.ctx.fillText(this.number.toString(), x, y);
    }
}