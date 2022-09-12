import data from './data.js';
import Character from './Character.js';

document.getElementById('attack-button').addEventListener('click', attack);

let lonneyTuneArray = ['duck', 'bunny', 'mouse'];
let isWaiting = false;

function attack() {
    if(!isWaiting) {
        captain.setDiceHtml();
        lonney.setDiceHtml();
        captain.takeDamage(lonney.currentDiceScore);
        lonney.takeDamage(captain.currentDiceScore);
        rendertoDOM();

        if(captain.dead) {
            endGame();
        } else if(lonney.dead) {
            isWaiting = true;
            if(lonneyTuneArray.length > 0) {
                setTimeout(() => {
                    lonney = getNewMonster();
                    rendertoDOM();
                    isWaiting = false;
                }, 1000)
            } else {
                setTimeout(() => {
                    endGame(); 
                }, 1000); 
            } 
        }
    }
}

function getNewMonster() {
    let nextMonster = data[lonneyTuneArray.shift()];
    return nextMonster ? new Character(nextMonster) : {}
}


function endGame() {
    isWaiting = true;
    let message = '';
    if(lonney.health > 0) {
        message = 'Lonney Tunes wins 🐰🐇🥕';
    } else if(captain.health > 0 && lonneyTuneArray.length === 0) {
        message = 'Captain America wins ⚒️👨‍🔬👨‍🔬';
    } else {
        message = 'No one wins ☮☮☮☮'
    }


    setTimeout(() => {
        document.body.innerHTML =  `
        <div class='end-game'>
            <div class='container end-container'>
                <h1>Game Over</h1>
                <p>${message}</p>
            </div>        
        </div>
        `       
    }, 1500);

}

function rendertoDOM() {
    document.getElementById('hero').innerHTML = captain.getCharacterHtml();
    document.getElementById('lonney').innerHTML = lonney.getCharacterHtml();
}



const captain = new Character(data.hero);
let lonney = getNewMonster();
rendertoDOM();
