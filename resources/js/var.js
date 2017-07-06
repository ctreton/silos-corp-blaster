const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const SPRITE_FRAMERATE = 7;

var map;
var cursors;
var layer;
var collideTextures = [];
var chars;
var currentCharIndex;

function preload() {
    loadChars();
    game.load.audio('bg_music', 'assets/sound/bensound-funnysong.mp3');

    game.load.image('office', 'assets/levels/office_art2.png');
    game.load.tilemap('map', "assets/levels/level1.json", null, Phaser.Tilemap.TILED_JSON);
}