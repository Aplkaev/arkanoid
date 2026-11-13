let canvas;
let context;
// шагов логики в секунду (скорости ниже заданы в пикселях за шаг)
let fps = 60;

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
    // внутреннее разрешение canvas
    canvas: {
        width: 600,
        height: 400
    },
    // шар
    boll: {
        // скорость = baseSpeed + level * levelSpeed (пикселей за шаг)
        baseSpeed: 2,
        levelSpeed: 0.5,
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
        speed: 8,
        // при инциализации цинтрируем
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 100,
            height: 20
        }
    },
    // кирпичи (ширина считается из количества колонок)
    enemy: {
        cols: 5,
        padding: 10,
        gap: 10,
        top: 20,
        height: 20,
        colors: ['#C44ED9', '#4E7BD9', '#D9A04E', '#4ED98A']
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