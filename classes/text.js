class Text {
    constructor(text, x, y, font, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;

        this.write();
    }
    write() {
        this.ctx = game.context;
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.text, this.x, this.y);
        
    }
}