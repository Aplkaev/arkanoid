class Player extends Stick {
    keys = {
        left: false,
        right: false
    }
    width = config.player.size.width;
    height = config.player.size.height;
    velocity = 0;        // текущая скорость (для плавности)

    constructor() {
        super(false);
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill()
        context.closePath();
    }

    // нажатие/отпускание клавиши направления ('left' | 'right')
    setKey(direction, pressed) {
        this.keys[direction] = pressed;
    }

    go() {
        let target = 0;
        if (this.keys.left)  target -= config.player.speed;
        if (this.keys.right) target += config.player.speed;

        this.velocity += (target - this.velocity) * 0.35; // плавность

        this.x += this.velocity;

        // Ограничение по краям экрана
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }
}
