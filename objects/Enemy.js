/**
 * Класс для прямоугольников
 */
class Enemy extends Stick {

    margin = 20;

    draw() {
        if (this.invisible) {
            return;
        }
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill()
        context.closePath();

        this.checkPosition();
    }

    setInvisible() {
        this.invisible = true;
        incScore();
    }
}