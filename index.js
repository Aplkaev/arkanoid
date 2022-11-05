/**
 * Рисуем все элементы на обычных местах
 * 
 * получаем середину для играков и мячика
 * 
 * обновляем картинку со статичными элементами
 * 
 * 
 */
window.addEventListener('load',function(){
    init();
    requestAnimationFrame(update);
});
