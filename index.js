document.addEventListener('DOMContentLoaded', function () {    
    init_event();
});

function init_event(){    
    // Обработчики для кнопки "Начать" в меню
    document.querySelector('.game_start').addEventListener('click', start_game);
    
    // Обработчики для кнопок "Начать сначала" на экранах победы/поражения
    document.getElementById('button_game_restart_win').addEventListener('click', start_game);
    document.getElementById('button_game_restart_fail').addEventListener('click', start_game);
    
    // Обработчик для кнопки "Назад в меню"
    document.querySelector('.back_to_menu').addEventListener('click', stop_game);
    
    // Обработчик для кнопки "Два игрока" - УБРАЛ скобки ()
    document.querySelector('.game_2_player').addEventListener('click', game_2_player);

    // клавиатура вешается один раз, а не при каждом старте игры
    document.addEventListener('keydown', (event) => handle_key(event, true));
    document.addEventListener('keyup', (event) => handle_key(event, false));
}

function game_2_player() { 
    let stPlayer = !document.querySelector('.game_2_player').classList.contains('btn-secondary');
    if(stPlayer){
        document.querySelector('.game_2_player').classList.add('btn-secondary');
        document.querySelector('.game_2_player').classList.remove('btn-info');
    } else {
        document.querySelector('.game_2_player').classList.remove('btn-secondary');
        document.querySelector('.game_2_player').classList.add('btn-info');
    }
    document.querySelector('.game_2_player').textContent = stPlayer ? 'Два игрока: вкл' : 'Два игрока: выкл';
    // Сохраняем состояние для использования в игре
    window.isTwoPlayer = stPlayer;
}

function stop_game(){
    document.querySelector('.back_to_menu').classList.add('d-none');
    document.querySelector('.game_menu').classList.remove('d-none');
    document.querySelector('.game_win').classList.add('d-none');
    document.querySelector('.game_fail').classList.add('d-none');
    close_game();
}

function start_game() {
    // Скрываем меню и показываем кнопку "Назад"
    document.querySelector('.game_menu').classList.add('d-none');
    document.querySelector('.back_to_menu').classList.remove('d-none');
    document.querySelector('.game_win').classList.add('d-none');
    document.querySelector('.game_fail').classList.add('d-none');
    
    // Получаем уровень сложности
    let level = parseInt(document.querySelector('.game_level').value);
    if (!level) {
        level = 5;
    }
    level = Math.min(10, Math.max(1, level));
    document.querySelector('.game_level').value = level;
    
    // Запускаем игру
    init_game(level);
}

function fail_game(){
    document.querySelector('.game_fail').classList.remove('d-none');
    document.querySelector('.back_to_menu').classList.add('d-none');
    close_game();
}

function win_game(){
    document.querySelector('.game_win').classList.remove('d-none');
    document.querySelector('.back_to_menu').classList.add('d-none');
    close_game();
}