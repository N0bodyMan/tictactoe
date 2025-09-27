const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('#status .current-player'); // Выбираем span для динамического обновления
const resetButton = document.getElementById('reset-button');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { 'X': 0, 'O': 0 }; // НОВОЕ: Объект для хранения счета

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// --- Функции для управления игрой ---

/**
 * Обновляет отображение текущего счета на доске.
 */
function updateScoreDisplay() {
    scoreXDisplay.textContent = `X: ${scores['X']}`;
    scoreODisplay.textContent = `O: ${scores['O']}`;
}

/**
 * Инициализация игры при загрузке.
 */
function initializeGame() {
    // Получаем счет из локального хранилища, если он там есть
    const storedScores = localStorage.getItem('ticTacToeScores');
    if (storedScores) {
        scores = JSON.parse(storedScores);
    }
    updateScoreDisplay();
    // Устанавливаем начального игрока в DOM
    statusDisplay.textContent = currentPlayer;
    statusDisplay.setAttribute('data-player', currentPlayer);
}

/**
 * Обрабатывает клик по клетке.
 */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    handleResultValidation();
}

/**
 * Проверяет результат игры и обновляет счет.
 */
function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.parentNode.innerHTML = `Победитель: <span class="current-player" data-player="${currentPlayer}">${currentPlayer}</span>! 🎉`;
        gameActive = false;

        // НОВОЕ: Обновляем счет и сохраняем его
        scores[currentPlayer]++;
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
        updateScoreDisplay();

        winningCombo.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.parentNode.innerHTML = `Ничья! 🤝`;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

/**
 * Меняет текущего игрока и обновляет статус.
 */
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // Обновляем текст и атрибут для стилей
    statusDisplay.parentNode.innerHTML = `Ходит: <span class="current-player" data-player="${currentPlayer}">${currentPlayer}</span>`;
}

/**
 * Сбрасывает игру до начального состояния.
 */
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    // Восстанавливаем DOM элемент статуса
    const statusContainer = document.getElementById('status');
    statusContainer.innerHTML = `Ходит: <span class="current-player" data-player="${currentPlayer}">${currentPlayer}</span>`;

    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('winning-cell');
    });
}

// --- Обработчики событий ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);

// Запуск при загрузке страницы
initializeGame();
