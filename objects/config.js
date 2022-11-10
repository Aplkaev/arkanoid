let canvas;
let context;
let fps = 120;

let player;
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

let config = {
    // шар
    boll: {
        speed: {
            x:0,
            y:0
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
        size:{
            width: 100,
            height: 20
        }
    }
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}