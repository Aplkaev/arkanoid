
class Stick extends ParentObject {
    width = 100;
    height = 20;

    /**
     * проверка прикосновения мяча
     * @param boll - class Boll
     */
    touch(boll) {
        if (this.invisible || !this.intersects(boll)) {
            return false;
        }
        
        // Отталкиваем мяч немного вверх, чтобы избежать залипания
        boll.y = this.y - boll.height;

        // === КЛЮЧЕВОЙ МОМЕНТ: угол отскока зависит от точки удара ===
        const relativeHit = (boll.x + boll.width / 2 - this.x) / this.width; // от 0 до 1

        // Преобразуем в угол: от -55° до +55° примерно
        const angle = (relativeHit - 0.5) * 1.9; // значение можно подкрутить (1.6 ~ 1.9)

        const currentSpeed = Math.sqrt(boll.speedX * boll.speedX + boll.speedY * boll.speedY);
        const newSpeed = Math.max(currentSpeed, 4.5); // минимальная скорость

        boll.speedX = Math.sin(angle) * newSpeed;
        boll.speedY = -Math.cos(angle) * newSpeed;   // всегда отскакивает вверх

        // Добавляем импульс от движения платформы (очень приятно ощущается)
        boll.speedX += this.velocity * 0.4;

        return true;
    }

    checkArea(boll) {
        return (
            this.y - (boll.y + boll.height) <= 0 &&
            (this.y + this.height) - (boll.y - boll.height) > 0 &&
            this.x - (boll.x + boll.width) <= 0 &&
            (this.x + this.width) - (boll.x - boll.width) >= 0
        )
    }

    checkHorizonLine(boll) {
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

    checkVerticalLine(boll) {
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