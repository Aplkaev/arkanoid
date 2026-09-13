let canvas;
let context;
let fps = 24;

let player;
let stPlayer = false;
let player2;
let boll;
let enemys = [];
// уровень сложности
let level = 1;
// для остановки обновления картиник
let debugUpdate = true;

// количество противников заполняются равномерно
let enemyLen = 20;
// противники на карте
let enemyMap = [
    [1,0,0,0,1],
    [0,1,0,1,0],
    [1,0,1,0,1]
];

// выход из игры
let exit = false;
// очки
let score = 0;
// жизни
let health = 3;
// игра окончена
let gameOver = false;
// флаг для если игра окончилась и выйграл или проиграл
let stWin = false;
let config = {
    // шар
    boll: {
        speed: {
            x: 0,
            y: 0
        },
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 10,
            height: 10
        }
    },
    // платформа
    player: {
        speed: 5,
        // при инциализации цинтрируем
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 100,
            height: 20
        }
    }
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function incScore(){
    score += 10;
}
function decScore(){
    score -= 10;
}

function desHealth(){
    health -= 1;
    decScore();
}