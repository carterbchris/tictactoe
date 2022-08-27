const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector("#board")
const winningMessage = document.querySelector('#winningMessage')
const restartButton = document.querySelector('#restartButton')
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]
const winningMessageText = document.querySelector("[data-winning-message-text]")
const x_class = "x";
const o_class = "o";
let circleTurn

if (restartButton) {
    restartButton.addEventListener('click', restartGame)
}

startGame()

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    boardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? o_class : x_class;
    placeMarker(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
        boardHoverClass(currentClass)
    }
}

function placeMarker(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    circleTurn = !circleTurn
}

function boardHoverClass(x) {
    board.classList.remove(x)
    const currentClass = circleTurn ? o_class : x_class
    board.classList.add(currentClass)
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerHTML = `Draw!`
    } else {
        winningMessageText.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessage.classList.add("show")
}

function restartGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
    })
    board.classList.remove(x_class)
    board.classList.remove(o_class)
    winningMessage.classList.remove("show")
    startGame()
}