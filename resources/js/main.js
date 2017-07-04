
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Silos-Blaster', { preload: preload, create: create, update: update });

function preload() {
    game.load.audio('bg_music', 'assets/sound/bensound-funnysong.mp3');
}

function create() {
    bgMusic = game.add.audio('bg_music');
    bgMusic.loop = true;
    bgMusic.play();
}

function update() {

}