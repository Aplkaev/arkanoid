
// инициализация
function init(){
    canvas = this.document.getElementById('game');
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    context = canvas.getContext('2d'); 


    let center_player = canvas.offsetWidth / 2 - config.player.size.width / 2;
    let bottom_player = canvas.offsetHeight - 50;
    config.player.position.x = center_player;
    config.player.position.y = bottom_player;
    // config.player.position.y = 250;

    let center_boll = canvas.offsetWidth / 2 - config.boll.size.width / 2;
    let bottom_boll = config.player.position.y - config.boll.size.height;
    config.boll.position.x = center_boll;
    config.boll.position.y = bottom_boll;

    config.boll.speed.x = getRandomArbitrary(-level,level);
    config.boll.speed.y = -1 * getRandomArbitrary(1,level);


    init_object();
    draw();
    init_events();
    requestAnimationFrame(update);
}

function init_object(){
    player = new Player();
    player.setPositions(config.player.position);
    boll = new Boll(false);
    boll.setPositions(config.boll.position);
    boll.setSpeed(config.boll.speed);
    for(let i = 0; i < enemy_len; i++){
        enemys.push(new Enemy());
    }
}
function init_events(){
    document.addEventListener('keydown',
        (event) => player.keydown(event.key));
    document.addEventListener('keyup', () => player.keyup());
}
/** ############### ренедр ####################*/ 

// рисуем врагов
function draw_enemy(length_enemy){
    let y = 20;
    let def_x = 10;
    let x = def_x;
    for(let index = 0; index < length_enemy; index++){
        let _enemy = enemys[index];
        _enemy.setPosition(x, y);
        _enemy.draw();
        x += _enemy.width + _enemy.margin;
        if(_enemy.x >= canvas.offsetWidth - _enemy.width - _enemy.margin){
            y += _enemy.height + _enemy.margin;
            x = def_x;
        }
    }
}
// рисуем мяч
function draw_boll(){
    boll.go();
    boll.draw();
}
// рисуем игрока
function draw_player(){
    player.go();
    player.setColor('#000000');
    player.touch(boll);
    player.draw();
}
// рисуем все
function draw(){
    draw_boll();
    draw_player();
    draw_enemy(enemy_len);
    
}

 
function update() {
    setTimeout(() => {
        if(debug_update === false) return;
        requestAnimationFrame(update);
        context.clearRect(0,0, canvas.width, canvas.height);
        draw()
    }, 1000 / fps);
}
