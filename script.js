const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; // Состояние игрового поля

// Все возможные выигрышные комбинации (индексы клеток)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// --- Функции для управления игрой ---

/**
 * Обрабатывает клик по клетке.
 * @param {Event} clickedCellEvent - Событие клика.
 */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Проверяем, можно ли сделать ход: игра активна И клетка пуста
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Обновляем состояние игры и интерфейс
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    handleResultValidation();
}

/**
 * Проверяет, выиграл ли кто-то или ничья.
 */
function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Комбинация не полная
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Игрок ${currentPlayer} победил! 🎉`;
        gameActive = false;

        // Выделение выигрышных клеток
        winningCombo.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
        return;
    }

    // Проверка на ничью (если нет пустых клеток и нет победителя)
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = `Ничья! 🤝`;
        gameActive = false;
        return;
    }

    // Если игра продолжается, меняем игрока
    handlePlayerChange();
}

/**
 * Меняет текущего игрока и обновляет статус.
 */
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Ходит: ${currentPlayer}`;
}

/**
 * Сбрасывает игру до начального состояния.
 */
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Ходит: ${currentPlayer}`;

    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('winning-cell');
    });
}

// --- Обработчики событий ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);
