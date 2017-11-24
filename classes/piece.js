class Piece {
    constructor(width, height, color, x, y, number) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.number = number;
    }
    update() {
        this.ctx = game.context;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}