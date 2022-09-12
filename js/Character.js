import {getRandomDiceArray, getDicePlacehoder} from './utils.js';

function healthpercantage(currentHealth, maxHealth) {
    return (100 * currentHealth) / maxHealth
}

function Character(data) {
    Object.assign(this, data);

    this.diceArray = getDicePlacehoder(this.diceCount);
    this.maxHealth = data.health;
    
    this.setDiceHtml = function() {
        this.currentDiceScore = getRandomDiceArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(dice => {
            return `<span class="dice">${dice}</span>`
        }).join('');
    };

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
    
    this.getHealthBarHtml = function() {
        let percent = healthpercantage(this.health, this.maxHealth);
        return  `
        <div class="health-bar">
            <div class="inner-health-bar ${percent < 26 ? "danger" : ""}" 
            style="width:${percent}%;"></div>
        </div>
        `
    }

    this.getCharacterHtml = function() {
        const {name, avatar, health, diceArray}  = this;
        const healthBar = this.getHealthBarHtml()

        return `
        <div class="card">
            <div class="card-body">
                <h2>${name}</h2>
                <img src="${avatar}" alt="${name} image" class="hero-img">
                <p>health: ${health}</p>
                ${healthBar}
            </div>
            <div class="card-footer">
                ${diceArray}
            </div>
        </div>`;
    };
};

export default Character;