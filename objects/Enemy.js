/**
 * Класс для прямоугольников
 */
class Enemy extends Stick {

    margin = 20;

    touch(boll) {

        if (this.invisible || !this.intersects(boll)) {
            return false;
        }

        // Определяем, с какой стороны произошло столкновение
        const overlapLeft   = (boll.x + boll.width) - this.x;
        const overlapRight  = (this.x + this.width) - boll.x;
        const overlapTop    = (boll.y + boll.height) - this.y;
        const overlapBottom = (this.y + this.height) - boll.y;
        
        if (boll.isStop) { 
            return false;
        }
        
        console.log({
            'overlapLeft':overlapLeft,
            'overlapRight':overlapRight,
            'overlapTop':overlapTop,
            'overlapBottom':overlapBottom
        });
        
        // Находим сторону с наименьшим перекрытием
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapTop || minOverlap === overlapBottom) {
            // Удар сверху или снизу → меняем вертикальную скорость
            boll.speedY = -boll.speedY;
        } else {
            // Удар сбоку → меняем горизонтальную скорость
            boll.speedX = -boll.speedX;
        }

        // Разрушаем блок
        this.invisible = true;
        incScore();

        // Лёгкий "отскок" мяча от блока, чтобы не залипал
        if (minOverlap === overlapTop)    boll.y = this.y - boll.height;
        if (minOverlap === overlapBottom) boll.y = this.y + this.height;
        
        boll.stop(true);

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

        this.checkPosition();
    }

    setInvisible() {
        this.invisible = true;
        incScore();
    }
}