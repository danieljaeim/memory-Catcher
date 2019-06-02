/@Author: Daniel Im 

const cards = document.querySelectorAll('.memory-card');
const score = document.getElementById('flips');
var bestScore = document.getElementById('best_score');
var container = document.querySelector('.game-container');
var audio = document.getElementById('audio');
var source = document.getElementById('source');
var button = document.querySelector('button');

//game state variables
let hasFlippedCard = false; 
let lockBoard = false; 
let firstCard, secondCard; 
var counter = 0;
var matchCount = 0; 
var savedScore = '--';


//flipsCards when you click them
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 

    this.classList.toggle('flip');
    //first click
    if(!hasFlippedCard) {
        hasFlippedCard = true; 
        firstCard = this; 
        counter++; 
        score.innerHTML = counter; 
        return; 
    }
    //second click
    hasFlippedCard = false; 
    secondCard = this; 
    counter++; 
    score.innerHTML = counter; 
    checkForMatch();
}

//checks if firstclick'd card === secondclick'd card
function checkForMatch() {
    let isMatch = (firstCard.dataset.name === secondCard.dataset.name); 
    if (isMatch) {
        disableCards();
        matchCount += 2; 
    } else {
        unFlipCards(); 
    }
}


//disables matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard(); 
}

//reflips cards that were not matched
function unFlipCards() {
    lockBoard = true; 

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard(); 
    }, 1500);  
}

//resets game state between wrong matches
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//makes sure to shuffle the game at the beginning
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12); 
        card.style.order = randomPos; 
    });
}; 

//resets the game as well as game variables
function gameOver() {
    if (matchCount === 36) {
        conserveScore();
        alert('You caught all the pokemon in ' + counter + ' moves! What an excellent display of trainership. May you use your powers for good. ~_＼ヽ\n＼＼ .Λ＿Λ.\n＼(　ˇωˇ)\n>　⌒ヽ\n/ 　 へ＼\n/　　/　＼＼\nﾚ　ノ　　 ヽ_つ\n/　/\n/　/|\n(　(ヽ\n|　|、＼\n| 丿 ＼ ⌒)\n| |　　) /\n`ノ ) 　 Lﾉ\n(_／\n ');
        button.removeEventListener('click', buttonLoad);
        lockBoard = true; 
        container.removeEventListener('click', gameOver);
        button.style.visibility = 'visible';
        cards.forEach(card => card.classList.remove('flip'));
        lockBoard = false; 
        score.innerHTML = '0';
        counter = 0; 
        matchCount = 0; 
        counter.innerHTML = '0';
        button.addEventListener('click', buttonLoad);
    }
}

//keeps track of score-game states
function conserveScore() {
    if (counter < savedScore || savedScore === null || savedScore === '--') {
        localStorage.setItem('localScore', counter);
        bestScore.innerHTML = localStorage.getItem('localScore'); 
        savedScore = localStorage.getItem('localScore');
    } else {
        bestScore.innerHTML = localStorage.getItem('localScore');
    }
}

//provides eventListeners to button and cards during reset
function buttonLoad() {
    button.style.visibility = 'hidden'; 
    cards.forEach(card => card.addEventListener('click', flipCard));
    container.addEventListener('click', gameOver);
}

//begins the game by providing button access to game-start
document.addEventListener('DOMContentLoaded', function() {
    shuffle(); 
    button.addEventListener('click', buttonLoad);
}); 


