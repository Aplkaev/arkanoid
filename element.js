/** refactoring */
var canvas;
var context;

var player;
var boll;
var enemy = [];
// уровень сложности
var level = 1;
// для остановки обновления картиник
var debug_update = true;

// количество противников заполняются равномерно
var enemy = 10;
// противники на карте
var enemy_map = [];

var config = {
    // шар
    boll: {
        speed: 10,
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
    platform: {
        speed: 10,
        // при инциализации цинтрируем
        position: {
            x: 0,
            y: 0
        },
    }
};
/** refactoring */
// var canvas = '';
// var context = '';
// let player = '';
// let boll = '';
// let enemy = [];
// let level = 15;
// let _update = true;
// const boll_speed = {
//     x: 10,
//     y: 10,
// }
// const player_speed = {
//     x: 10
// }
// const boll_position = {
//     x: 0,
//     y: 0
// };
// const beam_position = {
//     x: 0,
//     y: 0
// };
// const player_position = {
//     x: 0,
//     y: 0
// };
// const beam_setting = {
//     width: 100,
//     height: 20,
//     margin: 20
// }
// const boll_setting = {
//     width: 10,
//     height: 10
// }
// const enemy_len = 0;
class Position{
    x = 0;
    y = 0;
    constructor() {
        return this;
    }

    setX(x){
        this.x = x;
        return this;
    }
    setY(y){
        this.y = y;
        return this;
    }
    setPosition(position){
        this.x = position.x;
        this.y = position.y;
        return this;
    }
}
/**
 * Общий класс для настроек
 */
class SettingFeel {
    x = 0;
    y = 0;
    is_enemy = true;
    color = '#C44ED9';
    visable = false
    constructor(is_enemy = true) {

        this.is_enemy = is_enemy;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setPositions(position) {
        this.x = position.x;
        this.y = position.y;
    }
    setColor(color) {
        this.color = color;
    }
    checkPosition() {

    }
    changeVector(aox) {

    }
    draw() {
        if (this.visable) return;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill()
        context.closePath();

        this.checkPosition();
    }
}
/**
 * Класс для прямоугольников
 */
class Beam extends SettingFeel {
    width = 100;
    height = 20;
    margin = 20;

    touch(boll) {
        if (this.visable) return;
        // console.log(this.y - (boll.y + boll.height) < 0);
        if (
            this.y - (boll.y + boll.height) < 0 &&
            (this.y + this.height) - (boll.y - this.height) > 0 &&
            this.x - (boll.x + boll.width) <= 0 &&
            (this.x + this.width) - (boll.x - boll.width) >= 0
        ) {
            // console.log(this.y, boll.y + boll.height, boll_speed);
            if (
                this.x > boll.x + boll.width ||
                this.x + this.width < boll.x
            ) {
                console.log('x');
                boll.changeVector('x');
                return;
            }
            if (
                this.y > boll.y + boll.height ||
                this.y + this.height < boll.y
            ) {
                // console.log('y', this.y, boll.y + boll.height);

                boll.changeVector('y');
                return;
            }

        }
    }
}
/**
 * Класс для шарика
 */
class Boll extends SettingFeel {
    width = 10;
    height = 10;

    constructor() {
        super(false);
    }

    changeVector(aox) {
        if (aox == 'x') {
            boll_speed.x *= -1;
        }
        if (aox == 'y') {
            boll_speed.y *= -1;
        }
    }

    checkTouchBeam() {
        for (let i = 0; i < enemy.length; i++) {
            if (enemy[i] === undefined) return;
            enemy[i].touch(boll);
        }
    }
    checkPosition() {
        if (this.x - this.height <= 0) {
            this.x = 0;
            this.changeVector('x');
        }
        if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
            this.changeVector('x');
        }
        if (this.y - this.height <= 0) {
            this.y = 0;
            this.changeVector('y');
        }
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.changeVector('y');
        }
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();

        this.checkPosition();
        this.checkTouchBeam();
    }
}