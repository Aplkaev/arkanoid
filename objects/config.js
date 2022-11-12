let canvas;
let context;
let fps = 120;

let player;
let st_player = false;
let player2;
let boll;
let enemys = [];
// уровень сложности
let level = 1;
// для остановки обновления картиник
let debug_update = true;

// количество противников заполняются равномерно
let enemy_len = 10;
// противники на карте
let enemy_map = [];
// выход из игры
let exit = false;
// очки
let score = 0;
// жизни
let health = 3;

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