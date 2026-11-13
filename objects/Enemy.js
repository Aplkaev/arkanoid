/**
 * Класс для прямоугольников
 */
class Enemy extends Stick {

    touch(boll) {

        if (this.invisible || !this.intersects(boll)) {
            return false;
        }

        // Определяем, с какой стороны произошло столкновение
        const overlapLeft   = (boll.x + boll.width) - this.x;
        const overlapRight  = (this.x + this.width) - boll.x;
        const overlapTop    = (boll.y + boll.height) - this.y;
        const overlapBottom = (this.y + this.height) - boll.y;

        // Находим сторону с наименьшим перекрытием и выталкиваем мяч за неё
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapTop) {
            boll.y = this.y - boll.height;
            boll.speedY = -Math.abs(boll.speedY);
        } else if (minOverlap === overlapBottom) {
            boll.y = this.y + this.height;
            boll.speedY = Math.abs(boll.speedY);
        } else if (minOverlap === overlapLeft) {
            boll.x = this.x - boll.width;
            boll.speedX = -Math.abs(boll.speedX);
        } else {
            boll.x = this.x + this.width;
            boll.speedX = Math.abs(boll.speedX);
        }

        // Разрушаем блок
        this.invisible = true;
        incScore();

        return true;
    }

    draw() {
        if (this.invisible) {
            return;
        }
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill()
        context.closePath();
    }
}
