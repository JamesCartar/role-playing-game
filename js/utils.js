function getRandomDiceArray(diceCount) {
    return new Array(diceCount).fill(0).map(() => {
        return Math.floor(Math.random() * 6) + 1
    });
}

function getDicePlacehoder(diceCount) {
    return new Array(diceCount).fill(0).map(() =>  {
       return `<span class='placeholder-dice'></span>`;
    }).join('')
}

export {getRandomDiceArray, getDicePlacehoder};