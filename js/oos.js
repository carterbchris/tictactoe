document.querySelector('#board').addEventListener('click', play)
const winningMessage = document.querySelector('#winningMessage')
const winningMessageText = document.querySelector("[data-winning-message-text]")
const restartButton = document.querySelector('#restartButton')

function board() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    this.turn = true
    this.currentClass = function () {
        return this.turn ? "X" : "O"
    }
    this.switchTurn = function () {
        this.turn = !this.turn
    }
    this.data = document.querySelectorAll('[data-cell]')
    this.spaces = ["", "", "",
        "", "", "",
        "", "", ""]
    this.checkSpace = function (space) {
        return this.spaces[space] == ""
    }
    this.layBoard = function () {
        for (let i = 0; i < this.spaces.length; i++) {
            this.data[i].innerHTML = this.spaces[i]
        }
    }
    this.checkWin = function () {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return this.spaces[index].includes(this.currentClass())
            })
        })
    }
    this.checkDraw = function () {
        return this.spaces.every(space => {
            return space !== ""
        })
    }
    this.clearBoard = function () {
        for (let i = 0; i < this.spaces.length; i++) {
            this.spaces[i] = ""
        }
        this.turn = false
        winningMessage.classList.add('show')
        restartButton.addEventListener('click', () => {
            winningMessage.classList.remove('show')
        })
    }
    this.xScore = 0
    this.yScore = 0
    this.addScore = function (currentClass) {
        currentClass == "X" ? this.xScore++ : this.yScore++
        document.querySelector('.xScore').innerHTML = `X: ${this.xScore}`
        document.querySelector('.yScore').innerHTML = `Y: ${this.yScore}`
    }
    this.checkScore = function () {
        if (this.xScore - this.yScore > 2 || this.yScore - this.XScore > 2) {
            this.xScore = 0
            this.yScore = 0
            document.querySelector('.xScore').innerHTML = `X: ${this.xScore}`
            document.querySelector('.yScore').innerHTML = `Y: ${this.yScore}`
            winningMessageText.innerHTML = `${game.currentClass()} 's WON the war!`
        }
    }
}

let game = new board()

function play(e) {
    e = e.target.getAttribute('data-cell')
    if (game.checkSpace(e)) {
        game.spaces[e] = game.currentClass()
    }
    game.layBoard()
    if (game.checkWin()) {
        winningMessageText.innerHTML = `${game.currentClass()} 's WIN!`
        game.addScore(game.currentClass())
        game.checkScore()
        game.clearBoard()
        game.layBoard()
    } else if (game.checkDraw()) {
        winningMessageText.innerHTML = "Draw!"
        game.clearBoard()
        game.layBoard()
    }
    game.switchTurn()
}