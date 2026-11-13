
class Stick extends ParentObject {
    width = 100;
    height = 20;
    velocity = 0;

    /**
     * проверка прикосновения мяча
     * @param boll - class Boll
     */
    touch(boll) {
        // отбиваем только падающий мяч, иначе он может "застрять" в платформе
        if (this.invisible || boll.speedY <= 0 || !this.intersects(boll)) {
            return false;
        }

        // Отталкиваем мяч немного вверх, чтобы избежать залипания
        boll.y = this.y - boll.height;

        // === КЛЮЧЕВОЙ МОМЕНТ: угол отскока зависит от точки удара ===
        const relativeHit = (boll.x + boll.width / 2 - this.x) / this.width; // от 0 до 1

        // Преобразуем в угол примерно от -55° до +55°,
        // плюс немного подкручиваем мяч движением платформы
        let angle = (relativeHit - 0.5) * 1.9 + this.velocity * 0.03;
        // не даём мячу лететь почти горизонтально
        angle = Math.max(-1.1, Math.min(1.1, angle));

        // скорость сохраняем — она задаётся сложностью
        const speed = Math.sqrt(boll.speedX * boll.speedX + boll.speedY * boll.speedY);

        boll.speedX = Math.sin(angle) * speed;
        boll.speedY = -Math.cos(angle) * speed;   // всегда отскакивает вверх

        return true;
    }
}
