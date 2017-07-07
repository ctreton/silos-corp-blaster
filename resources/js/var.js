const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const SPRITE_FRAMERATE = 7;

var map;
var cursors;
var layer;
var collideTextures = [];
var chars;
var currentCharIndex;
var connectedPeople;
var nbPeople;
var splash;
var distance;
var hearts;
var happy;
var heartTimer;
var levelTimer;
var timerText;
var gameStyle;
var doors;
var computers;
var currentLevel;
var gameover;
var timer;
var heartStart;
var levelStart;

function preload() {
    loadChars();

    game.load.image('ground', 'assets/levels/ground.png');
    game.load.image('floor', 'assets/levels/floor.png');

    game.load.audio('bg_music', 'assets/sound/bensound-funnysong.mp3');


    game.load.image('sdoor', 'assets/levels/simpledoor.png');
    game.load.image('ddoor', 'assets/levels/door.png');

    game.load.image('computer', 'assets/levels/computer.png');

    game.load.image('splash', 'assets/splash/game_splash.png');
    game.load.image('levelOneStart', 'assets/splash/level1_start.png');
    game.load.image('levelTwoStart', 'assets/splash/level2_start.png');
    game.load.image('levelEnd2', 'assets/splash/l2_completed.png');
    game.load.image('levelEnd1', 'assets/splash/l1_completed.png');
    game.load.image('gameOver', 'assets/splash/game_over.png');

    game.load.spritesheet('heart', 'assets/sprites/heart.png', 16, 16, 2);

    game.load.image('office', 'assets/levels/office_art2.png');
    game.load.tilemap('map1', "assets/levels/level1.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map2', "assets/levels/level2.json", null, Phaser.Tilemap.TILED_JSON);
}