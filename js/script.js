import data from './data.js';
import Character from './Character.js';

document.getElementById('attack-button').addEventListener('click', attack);

function attack() {
    captain.getDiceHtml();
    duffy.getDiceHtml();
    captain.takeDamage(duffy.currentDiceScore);
    duffy.takeDamage(captain.currentDiceScore);
    rendertoDOM();

    if(captain.dead || duffy.dead) {
        endGame();
        document.getElementById('reset-button').addEventListener('click', reset);
    }
}

function reset() {
    settingDefaultState(captain);
    settingDefaultState(duffy);
}

function settingDefaultState(character) {
    character.health = 100;
    character.setDicePlaceHoder();
}

function endGame() {
    let message = duffy.health > 0 ? 'Duffy duck won 🐰🐇🥕' 
    : captain.health > 0 ? 'Captain America won ⚒️👨‍🔬👨‍🔬' 
    : 'No one wins ☮☮☮☮'
    document.body.innerHTML =  `
    <div class='end-game'>
        <div class='container end-container'>
            <h1>Game Over</h1>
            <p>${message}</p>
        </div>        
    </div>
    `
}

function rendertoDOM() {
    document.getElementById('hero').innerHTML = captain.getCharacterHtml();
    document.getElementById('lonney').innerHTML = duffy.getCharacterHtml();
}



const captain = new Character(data.hero);
const duffy = new Character(data.lonney);
rendertoDOM();
