
/**
 * Общий класс для настроек
 */
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
    draw(){

    }
    //движение предмета
    go(){

    }
}

class Stick extends ParentObject{
    width = 100;
    height = 20;
    /**
     * проверка прикосновения мяча
     * @param boll - class Boll
     */
    touch(boll) {
        if (this.invisible) return;

        if (
            this.checkArea(boll)
        ) {
            this.checkHorizonLine(boll);
            this.checkVerticalLine(boll);

        }
    }

    checkArea(boll){
        return (
            this.y - (boll.y + boll.height) <= 0 &&
            (this.y + this.height) - (boll.y - boll.height) > 0 &&
            this.x - (boll.x + boll.width) <= 0 &&
            (this.x + this.width) - (boll.x - boll.width) >= 0
        )
    }

    checkHorizonLine(boll){
        if (
            // левая точка платформы и права точка шара
            this.x >= boll.x + boll.width ||
            // правая точка платформы и левая точка шара
            this.x + this.width <= boll.x - boll.width
        ) {
            boll.changeVector('x');
            this.setInvisible();
        }
    }

    checkVerticalLine(boll){
        if (
            // верхняя точка платформы и нижняя точка шара
            this.y >= boll.y ||
            // нижняя точка платформы и верхняя точка шара
            this.y + this.height <= boll.y
        ) {

            boll.changeVector('y');
            this.setInvisible();
        }
    }

}