var fps = 1;
/** refactoring */

/** refactoring */
// инициализация
function init(){
    canvas = this.document.getElementById('game');
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    context = canvas.getContext('2d'); 



    let center_player = canvas.offsetWidth / 2 - beam_setting.width / 2;
    let bottom_player = canvas.offsetHeight - 50;
    player_position.x = center_player;
    player_position.y = bottom_player;



    
    let center_boll = canvas.offsetWidth / 2 - boll_setting.width / 2;
    let bottom_boll = canvas.offsetHeight - (50 + beam_setting.height);
    boll_position.x = center_boll;
    boll_position.y = bottom_boll;
    boll_position.y = 335;

    // boll_speed.x = getRandomArbitrary(-level,level);
    boll_speed.x = 0;
    // boll_speed.y = getRandomArbitrary(1,level);
    boll_speed.y = -1;


    player = new Beam(false);
    draw_boll();
    draw_player();
    draw_enemy(enemy_len);

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

/** ############### ренедр ####################*/ 

// рисуем врагов
function draw_enemy(length_enemy){
    let y = 20;
    let def_x = 10;
    let x = def_x;
    // enemy.splice(0,enemy.length);
    // enemy.length = 0;
    enemy = [];
    for(let index = 0; index < length_enemy; index++){
        let _enemy = new Beam();
        _enemy.setPosition(x, y);
        _enemy.draw();
        x += _enemy.width + _enemy.margin;
        if(_enemy.x >= canvas.offsetWidth - _enemy.width - _enemy.margin){
            y += _enemy.height + _enemy.margin;
            x = def_x;
        }
        enemy.push(_enemy);
        delete _enemy;
    }
}
// рисуем мяч
function draw_boll(){
    boll = new Boll(false);
    boll.setPositions(boll_position);
    boll.draw();
    
    boll_position.x += boll_speed.x;
    boll_position.y -= boll_speed.y;
}
// рисуем игрока
function draw_player(){
    
    player.setPosition(player_position.x, player_position.y);
    player.setColor('#000000');
    player.draw();

    player.touch(boll);
}
// рисуем все
function draw(){
    draw_boll();
    draw_player();
    draw_enemy(enemy_len);
}
// функция для отрисовки белового экрана и нового кадра
// function update(){

//     requestAnimationFrame(update);
// }


 
function update() {
    context.clearRect(0,0, canvas.width, canvas.height);
    draw();
    setTimeout(() => {
        if(_update === false) return;
        requestAnimationFrame(update);
 
        // ... Code for Drawing the Frame ...
 
    }, 1000 / fps);
}
