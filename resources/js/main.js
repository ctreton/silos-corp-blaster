
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'Silos-Blaster', { preload: preload, create: create, update: update });

function create() {
    initGame();
}

function update() {
    moveChar();
}

function moveChar() {
    currentChar = chars.getChildAt(currentCharIndex);
    game.physics.arcade.collide(currentChar, layer);
    currentChar.body.velocity.x = 0;
    currentChar.body.velocity.y = 0;

    if (cursors.left.isDown) {
        currentChar.body.velocity.x = -200;
        currentChar.animations.play('left');

    } else if (cursors.right.isDown) {
        currentChar.body.velocity.x = 200;
        currentChar.animations.play('right');

    } else if (cursors.up.isDown) {
        currentChar.body.velocity.y = -200;
        currentChar.animations.play('up');

    } else if (cursors.down.isDown) {
        currentChar.body.velocity.y = 200;
        currentChar.animations.play('down');
    }
}


function loadLevel(lvl) {
    map = game.add.tilemap('map');
    map.enableDebug = true;
    map.addTilesetImage('office');
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    map.setCollisionByExclusion([0]);

    addChar(4, 100, 200);
    addChar(3, 300, 300);
}