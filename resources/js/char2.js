function loadChars() {
    game.load.spritesheet('char3', 'assets/sprites/char3.png', 24, 32, 12);
    game.load.spritesheet('char4', 'assets/sprites/char4.png', 24, 32, 12);
}

function addChar(type, x, y) {
    x += 232;
    y += 96;
    type = 'char' + type;
    chara = chars.create(x, y, type, 7);
    // chara = game.add.sprite(x, y, type);
    chara.scale.set(1.5,1.5);
    game.physics.arcade.enable(chara);
    chara.animations.add(type, [7], 1, false);
    chara.inputEnabled = true;
    chara.events.onInputDown.add(changeCurrentChar, chara);
    chara.animations.add('idle', [7], 1, false);
    chara.animations.add('up', [0, 1, 2, 1], SPRITE_FRAMERATE, true);
    chara.animations.add('right', [3, 4, 5, 4], SPRITE_FRAMERATE, true);
    chara.animations.add('down', [6, 7, 8, 7], SPRITE_FRAMERATE, true);
    chara.animations.add('left', [9, 10, 11, 10], SPRITE_FRAMERATE, true);
    chara.body.collideWorldBounds = true;
    chara.body.setCircle(8, 4, 16);
    chara.charType = type;
    chara.happy = false;

    if (chars.countLiving() == 1) {
        currentCharIndex = chars.getChildIndex(chara);
    }
}

function changeCurrentChar(chara, pointer) {
    currentCharIndex = chars.getChildIndex(chara);
}