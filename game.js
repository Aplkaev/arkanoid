// инициализация
function init_game() {
    exit = false;


    canvas = this.document.getElementById('game');
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    context = canvas.getContext('2d');


    let center_player = canvas.offsetWidth / 2 - config.player.size.width / 2;
    let bottom_player = canvas.offsetHeight - 50;
    config.player.position.x = center_player;
    config.player.position.y = bottom_player;
    // config.player.position.y = 250;

    // let center_boll = canvas.offsetWidth / 2 - config.boll.size.width / 2;
    // let bottom_boll = config.player.position.y - config.boll.size.height;
    // config.boll.position.x = center_boll;
    // config.boll.position.y = bottom_boll;
    //
    // config.boll.speed.x = getRandomArbitrary(-level, level);
    // config.boll.speed.y = -1 * getRandomArbitrary(1, level);


    init_object();
    draw();
    init_events();
    requestAnimationFrame(update);
}

function close_game() {
    exit = true;
    clear_state();
    player = undefined;
    player2 = undefined;
}


function init_object() {
    player = new Player();
    player.setPositions(config.player.position);

    if (st_player) {
        player2 = new Player();
        player2.setPositions(config.player.position);
    }

    boll = new Boll(false);
    boll.init_position();
    boll.init_speed();
    for (let i = 0; i < enemy_len; i++) {
        enemys.push(new Enemy());
    }
}

function init_events() {
    document.addEventListener('keydown',
        (event) => {
            if (event.key === 'ArrowLeft') {
                player.keydownLeft();
            }
            if (event.key === 'ArrowRight') {
                player.keydownRight();
            }
            // управление для второго игрока
            if (player2 !== undefined) {
                if (event.key === 'a') {
                    player2.keydownLeft();
                }
                if (event.key === 'd') {
                    player2.keydownRight();
                }
            }
        });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            player.keyup();
        }
        // управление для второго игрока
        if (player2 !== undefined) {
            if (event.key === 'a' || event.key === 'd') {
                player2.keyup();
            }
        }
    });
}

/** ############### ренедр ####################*/

// рисуем врагов
function draw_enemy(length_enemy) {
    let y = 20;
    let def_x = 10;
    let x = def_x;
    if (!enemy_map) {
        for (let index = 0; index < length_enemy; index++) {
            let _enemy = enemys[index];
            _enemy.setPosition(x, y);
            _enemy.draw();
            x += _enemy.width + _enemy.margin;
            if (_enemy.x >= canvas.offsetWidth - _enemy.width - _enemy.margin) {
                y += _enemy.height + _enemy.margin;
                x = def_x;
            }
        }
    } else {
        draw_enemy_map(length_enemy);
    }
}

function draw_enemy_map(length_enemy) {
    let y = 20;
    let def_x = 10;
    let x = def_x;
    let index = 0;
    let draw_len = 0;
    for (let _index = 0; _index < enemy_map.length; _index++) {
        x = def_x;
        for (let __index = 0; __index < enemy_map[_index].length; __index++, index++) {
            let _enemy = enemys[index];
            _enemy.setPosition(x, y);
            if (enemy_map[_index][__index]) {
                _enemy.draw();
                draw_len++;
            }
            x += _enemy.width + _enemy.margin;
            if (_enemy.x >= canvas.offsetWidth - _enemy.width - _enemy.margin) {
                y += _enemy.height + _enemy.margin;
                x = def_x;
            }
        }
    }
    if (draw_len == 0) {
        win_game();
    }
}

// рисуем мяч
function draw_boll() {
    boll.go();
    boll.draw();
}

// рисуем игрока
function draw_player() {
    player.go();
    player.setColor('#000000');
    player.touch(boll);
    player.draw();

    if (player2 !== undefined) {
        console.log('draw 2 palyer', player2);
        player2.go();
        player2.setColor('#29E69D');
        player2.touch(boll);
        player2.draw();
    }
}

// рисуем все
function draw() {
    draw_boll();
    draw_player();
    draw_enemy(enemy_len);
    update_state();
}

function update_state() {
    document.querySelector('.game_health').innerHTML = health;
    document.querySelector('.game_score').innerHTML = score;

    if (health == 0) {
        fail_game()
    }

}

function clear_state() {
    document.querySelector('.game_health').innerHTML = '';
    document.querySelector('.game_score').innerHTML = '';
    health = 3;
    score = 0;
}


function update() {
    setTimeout(() => {
        // для остановки обновления игры
        if (debug_update === false) return;

        // очищаем белым квадратом экран
        context.clearRect(0, 0, canvas.width, canvas.height);

        // если игру остановили
        if (exit === true) return;

        // отрисовка
        draw()

        // рекурсивный запуск через Animation
        requestAnimationFrame(update);
    }, 1000 / fps);
}
