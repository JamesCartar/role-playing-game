import {getRandomDiceArray, getDicePlacehoder} from './utils.js';

function Character(data) {
    Object.assign(this, data);

    this.diceArray = getDicePlacehoder(this.diceCount);
    
    this.getDiceHtml = function() {
        this.currentDiceScore = getRandomDiceArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(dice => {
            return `<span class="dice">${dice}</span>`
        }).join('');
    };

    this.setDefaultState = function() {
        this.health = 100;
        this.dead = false;
        this.diceArray = getDicePlacehoder(this.diceCount);
    }

    this.takeDamage = function (damageScoreArray) {
        let totalDamage = damageScoreArray.reduce(function(total, currentScore) {
           return total + currentScore; 
        });
        this.health -= totalDamage;
        if(this.health <= 0) {
            this.dead = true;
            this.health = 0;
        }
    }
    

    this.getCharacterHtml = function() {
        const {name, avatar, health, diceCount, diceArray}  = this;

        return `
        <div class="card">
            <div class="card-body">
                <h2>${name}</h2>
                <img src="${avatar}" alt="${name} image" class="hero-img">
                <p>health: ${health}</p>
            </div>
            <div class="card-footer">
                ${diceArray}
            </div>
        </div>`;
    };
};

export default Character;