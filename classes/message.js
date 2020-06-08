class Message {
  message;
  messageContainer
  messageWidth = (PIECE_WIDTH * PIECES_PER_SIDE) + (PIECE_MARGIN * (PIECES_PER_SIDE - 1));
  constructor() {
    this.initialize();

  }

  initialize() {
    this.message = document.createElement('div');
    this.message.setAttribute('id', 'message');
    this.message.innerHTML = 'Shuffling...';
    this.message.classList.add('hidden');
    // this.message.style.width = this.messageWidth + 'px';
    // this.message.style.height = this.messageWidth + 'px';
    this.messageContainer = document.createElement('div');
    this.messageContainer.setAttribute('id', 'messageContainer');
    this.messageContainer.style.height = this.messageWidth + 'px';
    this.messageContainer.style.width = this.messageWidth + 'px';

    this.canvasDiv = document.getElementById('canvasDiv');
    this.canvasDiv.appendChild(this.messageContainer);
    this.messageContainer.appendChild(this.message);
  }

  show() {
    this.message.classList.remove('hidden');
  }

  hide() {
    this.message.classList.add('hidden');
  }
}