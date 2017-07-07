function initGame(){
    setCollideTextures();
    loadLevel(1);
    // loadLevel(2);
    loadSplash();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bgMusic = game.add.audio('bg_music');
    bgMusic.loop = true;
    bgMusic.play();
    gameStyle = { font: "32px Arial", fill: "#66279c", boundsAlignH: "center", boundsAlignV: "middle", align: "center"};

    game.stage.backgroundColor = '#1873CE';

    cursors = game.input.keyboard.createCursorKeys();

    gameover = false;

    timer = game.time.events;

    levelStart = 0;

}

function setCollideTextures() {
    computer = [
        297, 298, 299, 300,
        361, 262, 363, 364,
        425, 426, 427, 428,
        489, 490, 491, 492
    ];
    doors = [
        3725, 3789, 3853, 3917, 3981, 4045,
        3732, 3796, 3860, 3924, 3988, 4052
    ];
}

function loadSplash() {
    splash = game.add.sprite(0, 0, 'splash');
    splash.inputEnabled = true;
    splash.events.onInputDown.add(function(d, p) {d.kill();loadLevelOneStart();}, splash);
}

function loadLevelOneStart() {
    splash = game.add.sprite(232, 96, 'levelOneStart');
    splash.inputEnabled = true;
    splash.events.onInputDown.add(function(d, p) {d.kill();startTimer();}, splash);
}