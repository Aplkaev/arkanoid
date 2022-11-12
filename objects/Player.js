class Player extends Stick {
    speed = 0

    constructor() {
        super(false);
    }

    draw() {
        this.checkPosition();

        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill()
        context.closePath();


    }

    // всегда видимый
    setInvisible() {
        this.invisible = false;
    }

    // задаем скорость смещения
    keydown(key) {
        if (key === 'ArrowLeft') {
            this.speed = -config.player.speed;
        }
        if (key === 'ArrowRight') {
            this.speed = config.player.speed;
        }
    }

    keydownLeft() {
        this.speed = -config.player.speed;
    }

    keydownRight() {
        this.speed = config.player.speed;
    }

    // выставляем скорость 0
    keyup() {
        this.speed = 0;
    }

    go() {
        this.x += this.speed;
    }

    checkPosition() {
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
        }
    }

}