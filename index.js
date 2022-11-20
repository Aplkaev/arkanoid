/**
 * Рисуем все элементы на обычных местах
 *
 * получаем середину для играков и мячика
 *
 * обновляем картинку со статичными элементами
 *
 *
 */
window.addEventListener('load', function () {
    init_event();

});

function init_event(){
    document.querySelector('.game_start').addEventListener('click', () => {
        document.querySelector('.game_menu').classList.add('d-none');
        document.querySelector('.back_to_menu').classList.remove('d-none');
        document.querySelector('.game_win').classList.add('d-none');
        document.querySelector('.game_fail').classList.add('d-none');
        level = parseInt(document.querySelector('.game_level').value);
        if (!level) {
            level = 5;
        }
        init_game();
    });

    document.querySelector('.back_to_menu').addEventListener('click', function (){
        document.querySelector('.back_to_menu').classList.add('d-none');
        document.querySelector('.game_menu').classList.remove('d-none');
        close_game();
    })

    document.querySelector('.game_2_player').addEventListener('click',()=>{
        st_player = !document.querySelector('.game_2_player').classList.contains('btn-secondary');
        if(st_player){
            document.querySelector('.game_2_player').classList.add('btn-secondary');
            document.querySelector('.game_2_player').classList.remove('btn-info');
        }else {
            document.querySelector('.game_2_player').classList.remove('btn-secondary');
            document.querySelector('.game_2_player').classList.add('btn-info');
        }
    })
}

function fail_game(){
    document.querySelector('.game_fail').classList.remove('d-none');
    close_game();
}
function win_game(){
    document.querySelector('.game_win').classList.remove('d-none');
    close_game();

}