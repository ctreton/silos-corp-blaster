
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'Silos-Blaster', { preload: preload, create: create, update: update });

function create() {
    initGame();
}

function update() {
    if (chars.countLiving()){
        moveChar();
    }

    if(levelStart > 0) {
        minute = Math.floor((LEVEL_TIME - (timer.seconds - levelStart)) / 60);
        seconde = Math.floor((LEVEL_TIME - (timer.seconds - levelStart)) % 60);
        seconde = seconde < 10 ? '0' + seconde : seconde;
        if (!timerText) {
            timerText = game.add.text(0, 0, minute + ':' + seconde, gameStyle);
            timerText.setTextBounds(20, 20, 150, 30);
        }
        timerText.text = minute + ':' + seconde;
    } else {
        if (timerText)
            timerText.text = "";
    }

    pos = [];
    chars.forEach(function (e) {
        pos.push(e.body.x);
        pos.push(e.body.y);
    });
    if (currentLevel == 1) {
        distance = Math.pow(Math.abs(pos[0] - pos[2]), 2) + Math.pow(Math.abs(pos[1] - pos[3]), 2);
        if (!happy && distance < 500) {
            addHearts();
            happy = true;
        }
        if (happy && distance > 500) {
            happy = false;
            removeHearts();
        }
    } else if (currentLevel == 2) {
        if (pos[2] < 271 && pos[2] > 239 && pos[3] > 407 && pos[3] < 413) {
            computers.getChildAt(0).revive();
        } else {
            computers.getChildAt(0).kill();
        }
        if (pos[2] < 425 && pos[2] > 402 && pos[3] > 407 && pos[3] < 413) {
            computers.getChildAt(1).revive();
        } else {
            computers.getChildAt(1).kill();
        }
        if (pos[0] < 377 && pos[0] > 358 && pos[1] > 159 && pos[1] < 185) {
            computers.getChildAt(2).revive();
        } else {
            computers.getChildAt(2).kill();
        }
        if (!happy && computers.countLiving() == 2) {
            addHearts();
            happy = true;
        }
        if (happy && computers.countLiving() < 2) {
            happy = false;
            removeHearts();
        }
    }

    if (heartStart != 0 && (heartStart + 5) < timer.seconds) {
        finishLevel();
    }

    if (levelStart != 0 && (levelStart + LEVEL_TIME) < timer.seconds) {
        gameOver();
    }

    // console.log(Math.pow(Math.abs(pos[0] - pos[2]), 2) + Math.pow(Math.abs(pos[1] - pos[3]), 2));
}

function moveChar() {
    currentChar = chars.getChildAt(currentCharIndex);
    game.physics.arcade.collide(chars, layer);
    game.physics.arcade.collide(chars, chars);
    game.physics.arcade.collide(chars, doors);
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
    } else {
        currentChar.animations.play('idle');
    }
    if (happy) {
        hearts.forEach(function(e,p){
            chara = chars.getChildAt(e.chara);
            e.y = chara.y;
            e.x = chara.x;
        });
    }
}


function loadLevel(lvl) {
    currentLevel = lvl;
    ground = game.add.tileSprite(0, 0, 800, 600, "ground");
    floor = game.add.tileSprite(232, 96, 336, 336, "floor");
    connectedPeople = 0;
    map = game.add.tilemap('map' + lvl);
    map.addTilesetImage('office');
    layer = map.createLayer('Tile Layer '+lvl);
    layer.resizeWorld();

    map.setCollisionByExclusion([0, 3725, 3789, 3853, 3917, 3981, 4045, 3732, 3796, 3860, 3924, 3988, 4052]);

    doors = game.add.group();
    if (lvl == 1) {
        addDoor(64, 112, 2);
        addDoor(216, 112, 2);
    }
    addDoor(256, 208, 1);

    computers = game.add.group();
    if (lvl == 2) {
        happy = false;
        addComputer(16, 265);
        addComputer(184, 265);
        addComputer(144, 17);
        timerText.destroy();
        timerText = game.add.text(0, 0, '', gameStyle);
        timerText.setTextBounds(20, 20, 150, 30);
    }

    currentChar = game.add.group();
    chars = game.add.group();

    // addChar(4, 100, 40);
    // addChar(3, 50, 40);
    addChar(4, 100, 40);
    addChar(3, 280, 260);
    nbPeople = 2;


}

function addDoor(x, y, type) {
    x+=232;
    y+=96;
    type = type == 1 ? 's' : 'd';
    door = doors.create(x, y, type + 'door');
    game.physics.arcade.enable(door);
    door.inputEnabled = true;
    door.events.onInputDown.add(function(d, p) {d.kill();}, door);
    door.body.immovable = true;
    door.body.moves = false;
}

function addHearts() {
    // heartTimer = timer.add(Phaser.Timer.SECOND * 5, finishLevel);
    heartStart = timer.seconds;
    hearts = game.add.group();
    hearts.removeAll();
    chars.forEach(function(e,p){
        heart = hearts.create(e.x, e.y, 'heart');
        heart.animations.add('blink', [0, 1], 4, true);
        heart.animations.play('blink');
        heart.chara = chars.getChildIndex(e);
    });
}

function addComputer(x, y) {
    x+=232;
    y+=96;
    computer = computers.create(x, y, 'computer');
    computer.kill();
}

function removeHearts() {
    heartStart = 0;
    // timer.remove(heartTimer);
    hearts.removeAll();
}

function finishLevel() {
    timerText.destroy();
    levelStart = 0;
    heartStart = 0;
    hearts.removeAll();
    chars.removeAll();
    splash = game.add.sprite(232, 96, 'levelEnd'+currentLevel);
    if (currentLevel < 2) {
        splash.inputEnabled = true;
        splash.events.onInputDown.add(function(d, p) {
            splash.loadTexture('levelTwoStart');
            map.destroy();
            splash.events.onInputDown.add(function(de, pe) {
                loadLevel(currentLevel + 1);
                startTimer();
                splash.destroy();
            });
        }, door);
    }
}

function startTimer() {
    levelStart = timer.seconds;
}

function gameOver() {
    levelStart = 0;
    if (hearts)
        hearts.removeAll();
    if (chars)
        chars.removeAll();
    splash = game.add.sprite(232, 96, 'gameOver');
    gameover = true;
}