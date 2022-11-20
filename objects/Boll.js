/**
 * Класс для шарика
 */
class Boll extends ParentObject {
    width = 10;
    height = 10;
    speed_x = 0;
    speed_y = 0;

    constructor() {
        super(false);
    }

    setSpeed(speed) {
        this.speed_x = speed.x;
        this.speed_y = speed.y;
    }

    changeVector(aox) {
        // console.log('changeVector', aox, config.boll.speed);
        if (aox === 'x') {
            // config.boll.speed.x *= -1;
            this.speed_x *= -1;
        }
        if (aox === 'y') {
            // config.boll.speed.y *= -1;
            this.speed_y *= -1;
        }
    }

    checkTouchBeam() {
        for (let i = 0; i < enemys.length; i++) {
            if (enemys[i] === undefined) return;
            enemys[i].touch(boll);
        }
    }

    checkPosition() {
        // левая стена
        if (this.x - this.height <= 0) {
            this.x = this.width;
            this.changeVector('x');
        }
        // правая стена
        if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
            this.changeVector('x');
        }
        // верхняя стена
        if (this.y - this.height <= 0) {
            this.y = this.height;
            this.changeVector('y');
        }
        // нижняя стена
        if (this.y + this.height >= canvas.height) {
            this.speed_y = Math.abs(this.speed_y);
            this.touchDown();
        }
    }

    touchDown(){
        this.init_position();
        this.init_speed();
        desHealth();
    }

    /**
     * Задаем позицию
     * Нужен player и config
     */
    init_position(){
        let position = new Position();
        position.setY(player.y - this.height - 1)
            .setX(player.x + player.width / 2 - this.width / 2);
        boll.setPositions(position);
    }

    /**
     * Задаем скорость
     */
    init_speed(){
        config.boll.speed.x = getRandomArbitrary(-level, level);
        config.boll.speed.y = -1 * getRandomArbitrary(1, level);
        boll.setSpeed(config.boll.speed);
    }

    draw() {
        this.checkPosition();
        this.checkTouchBeam();

        context.beginPath();
        context.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();


    }

    go() {
        this.x += this.speed_x;
        this.y += this.speed_y;
    }
}