/**
 * Класс для шарика
 */
class Boll extends ParentObject {
    width = 10;
    height = 10;
    speedX = 0;
    speedY = 0;
    isStop = false;

    constructor() {
        super(false);
    }

    setSpeed(speed) {
        this.speedX = speed.x;
        this.speedY = speed.y;
        // this.speedX = 1;
        // this.speedY = 1;
    }

    changeVector(aox) {
        if (aox === 'x') {
            this.speedX *= -1;
        }
        if (aox === 'y') {
            this.speedY *= -1;
        }
    }

    checkTouchBeam() {
        for (let i = 0; i < enemys.length; i++) {
            if (enemys[i] === undefined) return;
            enemys[i].touch(boll);
        }
    }

    checkPosition() {
        // console.log({
        //     'x':this.x,
        //     'y':this.y,
        //     'width':canvas.width,
        //     'height':canvas.height
        // });

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
        this.initPosition();
        this.initSpeed();
        desHealth();
    }

    /**
     * Задаем позицию
     * Нужен player и config
     */
    initPosition(){
        let position = new Position();
        position.setY(player.y - this.height - 1)
            .setX(player.x + player.width / 2 - this.width / 2);
        boll.setPositions(position);
    }

    /**
     * Задаем скорость
     */
    initSpeed(){
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
        if(this.isStop) {
            return;
        }
        // this.x += this.speedX;
        // this.y += this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;

        // Стены
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.speedX = -this.speedX;
            this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
        }

        if (this.y <= 0) {
            this.speedY = -this.speedY;
        }

        // Вылетел вниз
        if (this.y > canvas.height) {
            health--;
            this.init_position();
            this.init_speed(); // или сохраняй текущую скорость
        }
    }

    stop(isStop) {
        this.isStop = isStop
    }
}