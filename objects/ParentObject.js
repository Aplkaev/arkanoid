class ParentObject {
    x = 0;
    y = 0;
    // цвет
    color = '#C44ED9';
    // остается, но не рисуем
    invisible = false;

    constructor(is_enemy = true) {
        this.is_enemy = is_enemy;
    }

    // позиция
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // позиция
    setPositions(position) {
        this.x = position.x;
        this.y = position.y;
    }

    // задаем цвет
    setColor(color) {
        this.color = color;
    }

    // проверка позици и колизии
    checkPosition() {

    }

    // изменение вектора
    changeVector(aox) {

    }

    //отрисовка предмета
    draw() {

    }

    //движение предмета
    go() {

    }

    // Простая AABB коллизия (Axis-Aligned Bounding Box)
    intersects(other) {
        return !(
            this.x + this.width  < other.x ||
            this.x               > other.x + other.width ||
            this.y + this.height < other.y ||
            this.y               > other.y + other.height
        );
    }

    touch(boll) {
        return false;
    }
}
