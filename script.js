'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const player2section = document.querySelector('.player--1');
const player1section = document.querySelector('.player--0');
const player1 = document.querySelector('#name--0');
const player2 = document.querySelector('#name--1');
const diceEl = document.querySelector('.dice');
const newRoll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const currentScore1 = document.querySelector('#current--0');
const currentScore0 = document.querySelector('#current--1');
//console.log(diceEl)
let currentScore, activePlayer, playing, scores;

const gameInit = function () {
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  currentScore1.textContent = 0;
  currentScore0.textContent = 0;
  player1section.classList.remove('player--winner');
  player2section.classList.remove('player--winner');
  player1section.classList.add('player--active');
  player2section.classList.remove('player--active');
};

gameInit();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1section.classList.toggle('player--active');
  player2section.classList.toggle('player--active');
};

function rollFunction() {
  if (playing) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    //console.log(randomNumber, typeof randomNumber)
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}
newRoll.addEventListener('click', rollFunction);

function holdFunction() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      currentScore;
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
}

hold.addEventListener('click', holdFunction);
newGame.addEventListener('click', gameInit);
