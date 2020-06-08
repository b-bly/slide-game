let PIECES_PER_SIDE = 3; //initialized to 2, but set in settings.js
const PIECE_WIDTH = 50;
const PIECE_COLOR = 'skyblue';
const BOARD_MARGIN_Y = 10;
//const Y_OFFSET = 40;
const PIECE_MARGIN = 10;
const UPDATE_RATE = 300; //milliseconds
const USER_DECIDES_SETTINGS = false;
const ANIMATION_RATE = 10; // ms
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';
const DELTA_FACTOR = 20;
const SHUFFLE_MOVES = 10;

if ((PIECE_WIDTH + PIECE_MARGIN )% DELTA_FACTOR > 0) throw new Error('DELTA_FACTOR is not a factor of PIECE_WIDTH');