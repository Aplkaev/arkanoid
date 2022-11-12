/**
 * Класс для позиуионирования
 */
class Position {
    x = 0;
    y = 0;

    constructor() {
        return this;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setPosition(position) {
        this.x = position.x;
        this.y = position.y;
        return this;
    }
}