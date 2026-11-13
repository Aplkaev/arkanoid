// id текущего requestAnimationFrame, чтобы при рестарте не запускать второй цикл
let loopId = 0;
let lastTime = 0;
let accumulator = 0;

// инициализация
function init_game(newLevel) {
    if (newLevel) {
        level = newLevel;
    }

    cancelAnimationFrame(loopId);
    exit = false;
    clear_state();

    canvas = document.getElementById('game');
    // внутреннее разрешение фиксированное, CSS только масштабирует картинку —
    // так коллизии не зависят от размера окна
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    context = canvas.getContext('2d');

    init_object();

    lastTime = performance.now();
    accumulator = 0;
    loopId = requestAnimationFrame(update);
}

function close_game() {
    exit = true;
    cancelAnimationFrame(loopId);
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    clear_state();
    player = undefined;
    player2 = undefined;
    enemys = [];
}


function init_object() {
    let y = canvas.height - 50;
    let width = config.player.size.width;

    player = new Player();
    player.setColor('#000000');

    if (window.isTwoPlayer) {
        // платформы рядом, а не друг на друге
        player.setPosition(canvas.width / 3 - width / 2, y);
        player2 = new Player();
        player2.setColor('#29E69D');
        player2.setPosition(canvas.width * 2 / 3 - width / 2, y);
    } else {
        player.setPosition(canvas.width / 2 - width / 2, y);
    }

    boll = new Boll();
    boll.initPosition();
    boll.initSpeed();

    init_enemies();
}

// раскладываем кирпичи по карте так, чтобы ряд занимал всю ширину canvas
function init_enemies() {
    enemys = [];

    let map = enemyMap;
    if (!map) {
        // карты нет — равномерная сетка на enemyLen кирпичей
        map = [];
        for (let i = 0; i < enemyLen; i += config.enemy.cols) {
            map.push(new Array(Math.min(config.enemy.cols, enemyLen - i)).fill(1));
        }
    }

    let cols = Math.max(...map.map(row => row.length));
    let { padding, gap, top, height, colors } = config.enemy;
    let width = (canvas.width - padding * 2 - gap * (cols - 1)) / cols;

    map.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (!cell) return;
            let enemy = new Enemy();
            enemy.width = width;
            enemy.height = height;
            enemy.setColor(colors[r % colors.length]);
            enemy.setPosition(padding + c * (width + gap), top + r * (height + gap));
            enemys.push(enemy);
        });
    });
}

// управление: стрелки — первый игрок, A/D — второй.
// event.code не зависит от раскладки (работает и на русской)
function handle_key(event, pressed) {
    let controls = [
        [player, 'ArrowLeft', 'ArrowRight'],
        [player2, 'KeyA', 'KeyD'],
    ];
    for (let [_player, left, right] of controls) {
        if (_player === undefined) continue;
        if (event.code === left) {
            _player.setKey('left', pressed);
            event.preventDefault();
        }
        if (event.code === right) {
            _player.setKey('right', pressed);
            event.preventDefault();
        }
    }
}

/** ############### логика ####################*/

// один шаг игры фиксированной длины
function step() {
    player.go();
    player.touch(boll);
    if (player2 !== undefined) {
        player2.go();
        player2.touch(boll);
    }

    boll.go();
    boll.checkPosition();
    boll.checkTouchBeam();

    if (enemys.every(enemy => enemy.invisible)) {
        win_game();
        return;
    }
    if (health <= 0) {
        fail_game();
    }
}

/** ############### рендер ####################*/

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    enemys.forEach(enemy => enemy.draw());
    player.draw();
    if (player2 !== undefined) {
        player2.draw();
    }
    boll.draw();
    update_state();
}

function update_state() {
    document.querySelector('.game_health').innerHTML = health;
    document.querySelector('.game_score').innerHTML = score;
}

function clear_state() {
    document.querySelector('.game_health').innerHTML = '';
    document.querySelector('.game_score').innerHTML = '';
    health = 3;
    score = 0;
}


// игровой цикл: логика идёт фиксированными шагами 1000/fps мс,
// поэтому скорость игры не зависит от частоты монитора
function update(time) {
    // для остановки обновления игры
    if (exit || debugUpdate === false) return;

    // ограничиваем, чтобы после сворачивания вкладки мяч не "телепортировался"
    accumulator += Math.min(time - lastTime, 250);
    lastTime = time;

    let stepTime = 1000 / fps;
    while (accumulator >= stepTime) {
        step();
        // игра могла закончиться внутри шага
        if (exit) return;
        accumulator -= stepTime;
    }

    draw();
    loopId = requestAnimationFrame(update);
}
