//Initial data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}

let turn = ''
let warning = ''
let playing = false

reset()

//Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', clickedItem)
})

//Functions
function clickedItem(event) {
    let item = event.target.getAttribute('data-item')
    if (playing && square[item] === '') {
        square[item] = turn
        renderSquare()
        toggleTurn()
    }
}

function reset() {
    warning = ''

    let random = Math.floor(Math.random() * 2)
    turn = (random === 0) ? 'X' : 'O'

    for (let i in square) {
        square[i] = ''
    }

    playing = true

    renderSquare()
    renderInfo()
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }

    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = turn
    document.querySelector('.resultado').innerHTML = warning
}

function toggleTurn() {
    turn = (turn === 'X') ? 'O' : 'X'
    renderInfo()
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'O "X" venceu!'
        playing = false
    } else if (checkWinnerFor('O')) {
        warning = 'O "O" venceu!'
        playing = false
    } else if (isFull()) {
        warning = 'Deu empate!'
        playing = false
    }
}

function checkWinnerFor(turn) {
    let possibility = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1,',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in possibility) {
        let array = possibility[w].split(',')
        //let hasWon = array.every(option => square[option] === turn) 
        let hasWon = array.every((option) => {
            if (square[option] === turn) {
                return true
            } else {
                return false
            }
        })

        if (hasWon) {
            return true
        }
    }

    return false
}

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false
        }
    }

    return true
}


