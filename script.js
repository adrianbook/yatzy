import snopp from "./junk.js"

let dice = []
let rollResults = [0, 0, 0, 0, 0, 0]

let turnAndRolls = {
    turn: 0,
    roll: 0,
    numberOfPlayers: 0,
    outOfTurns: false,
    incrementRoll: function () {
        this.roll++
        if (this.roll > 2) {
            this.outOfTurns = true
        }
    },
    incrementTurn: function () {
        this.roll = 0
        this.turn++
        this.outOfTurns = false
        if (this.turn === this.numberOfPlayers) this.turn = 0
    }
}

Array.from(document.getElementsByClassName('die')).forEach(e => { 
        dice.push({
            dieElement: e,
            numericValue: null,
            locked: false
        })
})


document.getElementById('newGame').addEventListener('click', () => {
    turnAndRolls.incrementTurn()
    dice.forEach(x => { if (x.locked) { saveDie(x) } })
    rollingProcedure(18)
})


document.getElementById('highscore').addEventListener('click', () => { console.log(turnAndRolls) })

window.addEventListener('load', () => {
    rollDice()
})

document.getElementById('playerAdd').addEventListener('click', () => {
    turnAndRolls.numberOfPlayers++
    document.querySelector('.header-text p').innerText = turnAndRolls.numberOfPlayers
})
document.getElementById('playerRemove').addEventListener('click', () => {
    turnAndRolls.numberOfPlayers--
    document.querySelector('.header-text p').innerText = turnAndRolls.numberOfPlayers
})

document.getElementById('kastKnapp').addEventListener('click', () => {
    if (turnAndRolls.outOfTurns) return
    rollingProcedure(9)
    snopp.snopp()
})

dice.forEach(x => x.dieElement.addEventListener('click', () => {
    saveDie(x)
}))

function saveDie(die) {
    if (!die.locked) {
        die.locked = true
        die.dieElement.style.borderColor = 'blue'
        die.dieElement.style.borderStyle = 'solid'
    } else {
        die.locked = false
        die.dieElement.style.borderColor = 'black'
        die.dieElement.style.borderStyle = 'solid'
    }
}

function rollDice() {
    dice
        .filter(d => !d.locked)
        .forEach(d => rollAndRenderDie(d))
}

function rollAndRenderDie(die) {
    die.numericValue = Math.ceil(Math.random() * 6)
    let renderArr = null

    switch (die.numericValue) {
        case 1:
            renderArr = [false, false, false, true, false, false, false]
            break
        case 2:
            renderArr = [true, false, false, false, false, false, true]
            break
        case 3:
            renderArr = [true, false, false, true, false, false, true]
            break
        case 4:
            renderArr = [true, true, false, false, false, true, true]
            break
        case 5:
            renderArr = [true, true, false, true, false, true, true]
            break
        default:
            renderArr = [true, true, true, false, true, true, true]
    }

    const children = Array.from(die.dieElement.querySelectorAll('*'))
    children.forEach(e => e.style.visibility = (renderArr[children.indexOf(e)] ? 'visible' : 'hidden'))
}


function recordDiceResults() {
    rollResults.fill(0)
    dice.forEach(x => rollResults[rollResults.length - x.numericValue]++)
    console.log(rollResults)
}

function rollAndRecordDice() {
    rollDice()
    recordDiceResults()
    turnAndRolls.incrementRoll()
}

function diePromise(iterations) {
    return new Promise((resolve) => {
        function rollingAnimation(numberOfRolls, speed) {
            if (numberOfRolls === 0) {
                resolve(1)
                return
            }
            setTimeout(() => {
                let r = Math.floor(Math.random() * 255)
                let g = Math.floor(Math.random() * 255)
                let b = Math.floor(Math.random() * 255)

                setDieColors(r,g,b)
                rollDice()
                rollingAnimation(numberOfRolls - 1, speed * 1.4)
            }, speed)
        }
        rollingAnimation(iterations, 3)
    })
}

async function rollingProcedure(iterations) {

    try {
        await diePromise(iterations)

        rollAndRecordDice()
        console.log(rollResults)
    } finally {
        setDieColors(0,0,0)
    }

}

function setDieColors(r, g, b) {
    dice
        .filter(d => !d.locked)
        .forEach(d => {
            d.dieElement.style.borderColor = `rgb(${r},${g},${b})`
            Array.from(d.dieElement.children).forEach(d => d.style.backgroundColor = `rgb(${r},${g},${b})`)
        })
}
