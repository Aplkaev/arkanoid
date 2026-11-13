/**
 * Класс для шарика
 */
class Boll extends ParentObject {
    width = 10;
    height = 10;
    speedX = 0;
    speedY = 0;

    constructor() {
        super(false);
    }

    setSpeed(speed) {
        this.speedX = speed.x;
        this.speedY = speed.y;
    }

    changeVector(aox) {
        if (aox === 'x') {
            this.speedX *= -1;
        }
        if (aox === 'y') {
            this.speedY *= -1;
        }
    }

    // за шаг разбиваем максимум один кирпич, иначе при ударе в стык двух
    // кирпичей скорость развернётся дважды и мяч пролетит насквозь
    checkTouchBeam() {
        for (let i = 0; i < enemys.length; i++) {
            if (enemys[i].touch(this)) return;
        }
    }

    checkPosition() {
        // x/y — левый верхний угол ограничивающего прямоугольника мяча
        // (как у Stick/Enemy), width/height — его размер. Отрисовка в draw()
        // переводит это в центр+радиус только для canvas.arc().
        // Направление задаём явно (abs), а не инвертируем — иначе мяч может залипнуть в стене.

        // левая стена
        if (this.x <= 0) {
            this.x = 0;
            this.speedX = Math.abs(this.speedX);
        }
        // правая стена
        if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
            this.speedX = -Math.abs(this.speedX);
        }
        // верхняя стена
        if (this.y <= 0) {
            this.y = 0;
            this.speedY = Math.abs(this.speedY);
        }
        // нижняя стена
        if (this.y + this.height >= canvas.height) {
            this.touchDown();
        }
    }

    touchDown(){
        desHealth();
        this.initPosition();
        this.initSpeed();
    }

    /**
     * Ставим мяч над платформой первого игрока
     */
    initPosition(){
        let position = new Position();
        position.setY(player.y - this.height - 1)
            .setX(player.x + player.width / 2 - this.width / 2);
        this.setPositions(position);
    }

    /**
     * Запускаем вверх под случайным углом, скорость зависит от сложности
     */
    initSpeed(){
        let speed = config.boll.baseSpeed + level * config.boll.levelSpeed;
        let angle = getRandomArbitrary(-Math.PI / 4, Math.PI / 4);
        config.boll.speed.x = Math.sin(angle) * speed;
        config.boll.speed.y = -Math.cos(angle) * speed;
        this.setSpeed(config.boll.speed);
    }

    draw() {
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    go() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
