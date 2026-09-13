class Player extends Stick {
    speed = 0
    keys = {
        left: false,
        right: false
    }
    width = 100;
    height = 20;
    speed = 8;           // максимальная скорость
    velocity = 0;        // текущая скорость (для плавности)

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
        this.keys.left = true
    }

    keydownRight() {
        this.keys.right = true

    }

    // выставляем скорость 0
    keyup() {
        this.keys.left = false
        this.keys.right = false
    }

    go() {
        let target = 0;
        if (this.keys.left)  target -= this.speed;
        if (this.keys.right) target += this.speed;

        this.velocity += (target - this.velocity) * 0.35; // плавность

        this.x += this.velocity;

        // Ограничение по краям экрана
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
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