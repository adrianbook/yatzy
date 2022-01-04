const snopp = {


    dieRoll(die) {
        if (die.locked) return die.value

const result = dieGeneration()
let children = Array.from(die.dieElement.querySelectorAll('*'))
children.forEach(x => {
    if (result.renderValue[children.indexOf(x)]) {
        x.style.visibility = 'visible'
    } else {
        x.style.visibility = 'hidden'
    }

});
return result.value
},

snopp() {
    console.log("snopp")
},
dieGeneration() {
    let result = Math.floor(Math.random() * 6) + 1


    switch (result) {
        case 1:
            return {
                value: result,
                renderValue: [false, false, false, true, false, false, false]
            }
        case 2:
            return {
                value: result,
                renderValue: [true, false, false, false, false, false, true]
            }
        case 3:
            return {
                value: result,
                renderValue: [true, false, false, true, false, false, true]
            }
        case 4:
            return {
                value: result,
                renderValue: [true, true, false, false, false, true, true]
            }
        case 5:
            return {
                value: result,
                renderValue: [true, true, false, true, false, true, true]
            }
        default:
            return {
                value: result,
                renderValue: [true, true, true, false, true, true, true]
            }
    }
}
} 
export default snopp