const ruleSet = {
    values: [
        {
            name: "par",
            points: 0,
            pointCalculation: function (rollResults) {
                let arrTest = rollResults.findIndex(p => p > 1)
                return (arrTest > -1 ? 2 * (6 - arrTest) : 0)
            }
        },
        {
            name: "triss",
            points: 0,
            pointCalculation: function (rollResults) {
                let arrTest = rollResults.findIndex(p => p > 2)
                return (arrTest > -1 ? 3 * (6 - arrTest) : 0)
            }
        },
        {
            name: "fyrtal",
            points: 0,
            pointCalculation: function (rollResults) {
                let arrTest = rollResults.findIndex(p => p > 3)
                return (arrTest > -1 ? 4 * (6 - arrTest) : 0)
            }
        },
        {
            name: "yatzy",
            points: 0,
            pointCalculation: function (rollResults) {
                let arrTest = rollResults.includes(5)
                return (arrTest ? 50 : 0)
            }
        },
        {
            name: "tvaPar",
            points: 0,
            pointCalculation: function (rollResults) {
                let arrTest = rollResults.findIndex(p => p === 2)
                let arrTest2 = rollResults.lastIndexOf(p = p === 2)
                return (arrTest != arrTest2 ? 2 * (12 - arrTest - arrTest2) : 0)
            }
        },
        {
            name: "chans",
            points: 0,
            pointCalculation: function (rollResults) {
                sum = 0
                for (let i = 0; i < 6; i++) {
                    sum += rollResults[i] * (6 - i)
                }
                return sum
            }
        },
        {
            name: "litenStege",
            points: 0,
            pointCalculation: function (rollResults) {
                return (rollResults === [0, 1, 1, 1, 1, 1] ? 15 : 0)
            }
        },
        {
            name: "storStege",
            points: 0,
            pointCalculation: function (rollResults) {
                return (rollResults === [1, 1, 1, 1, 1, 0] ? 20 : 0)
            }
        },
        {
            name:"kak",
            points: 0,
            pointCalculation: function(rollResults) {
                indexOfThree = rollResults.indexOf(3)
                indexOfTwo = rollResults.indexOf(2)
                if ((indexOfThree+indexOfTwo)>=indexOfThree) {
                    return 3 * rollResults[indexOfThree] + 2 * rollResults[indexOfTwo]
                }
                return 0           
            }
        },
        {
            name:"ettor",
            points: 0,
            pointCalculation: calculateOneThroughSix(rollResults, 1)
        },
        {
            name:"tvaor",
            points: 0,
            pointCalculation: calculateOneThroughSix(rollResults, 2)
        },
        {
            name:"treor",
            points: 0,
            pointCalculation: calculateOneThroughSix(rollResults, 3)
        },
        {
            name:"fyror",
            points: 0,
            pointCalculation: calculateOneThroughSix(rollResults, 4)
        },
        {
            name:"femmor",
            points: 0,
            pointCalculation: calculateOneThroughSix(rollResults, 5)
        },
        {
            name:"sexor",
            points: 0,
            pointCalculation: calculateOneThroughSix(rollResults, 6)
        },
    ]
}

calculateOneThroughSix(rollResults, value) {
    return value * 6 - rollResults[value]
}