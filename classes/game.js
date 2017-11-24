class Game {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.initialize();
        
    }
    initialize() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        //this.interval = setInterval(this.updateGame, 20);
    }
    start() {
        this.text = new Text('Slide puzzle', 40, 40, '30px Ariel', 'black');
        
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    updateGame() {

    }
}