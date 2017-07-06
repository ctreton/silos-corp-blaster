function initGame(){
    chars = game.add.group();
    currentChar = game.add.group();
    setCollideTextures();
    loadLevel(1);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bgMusic = game.add.audio('bg_music');
    bgMusic.loop = true;
    // bgMusic.play();

    game.stage.backgroundColor = '#1873CE';

    cursors = game.input.keyboard.createCursorKeys();


}

function setCollideTextures() {
    collideTextures = [
        297, 298, 299, 300,
        361, 262, 363, 364,
        425, 426, 427, 428,
        489, 490, 491, 492
    ]
}