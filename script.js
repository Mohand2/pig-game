'use strict';

const diceImgs = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];

let diceValue;
let currentScore = 0;
let player1Score = 0;
let player2Score = 0;

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const snackBar = document.querySelector('.snackbar');

const imgElement = document.querySelector('.dice');
const currentScoreOfPlayer1 = document.querySelector('#current--0');
const currentScoreOfPlayer2 = document.querySelector('#current--1');
const ScoreOfPlayer1 = document.querySelector('#score--0');
const ScoreOfPlayer2 = document.querySelector('#score--1');
const Player1 = document.querySelector('.player--0');
const Player2 = document.querySelector('.player--1');

const randomDiceIndex = () => Math.floor(Math.random() * diceImgs.length);
const setDiceValue = index => {
  if (index < 6) diceValue = index + 1;
  console.log(diceValue);
};

const changeDiceImg = () => {
  let index = randomDiceIndex();
  imgElement.src = diceImgs[index];
  setDiceValue(index);
};

function play() {
  var audio = new Audio('sound.mp3');
  audio.play();
}

const toggleSnackBar = winner => {
  snackBar.classList.add('show');
  snackBar.textContent = `The winner is ${winner}`;
};

const switchPlayer = () => {
  play();
  if (Player1.classList.contains('player--active')) {
    Player1.classList.remove('player--active');
    Player2.classList.add('player--active');
  } else {
    Player1.classList.add('player--active');
    Player2.classList.remove('player--active');
  }
};

const setCurrentScore = () => {
  Player1.classList.contains('player--active')
    ? (currentScoreOfPlayer1.textContent = currentScore)
    : (currentScoreOfPlayer2.textContent = currentScore);
};
const setScore = () => {
  if (Player1.classList.contains('player--active')) {
    player1Score += currentScore;
    ScoreOfPlayer1.textContent = player1Score;
  } else {
    player2Score += currentScore;
    ScoreOfPlayer2.textContent = player2Score;
  }
};

const setPlayer1AsStarter = () => {
  if (Player2.classList.contains('player--active')) {
    Player2.classList.remove('player--active');
    Player1.classList.add('player--active');
  }
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
const resetGame = async () => {
  currentScore = 0;
  player1Score = 0;
  player2Score = 0;

  ScoreOfPlayer1.textContent = player1Score;
  ScoreOfPlayer2.textContent = player2Score;

  currentScoreOfPlayer1.textContent = currentScore;
  currentScoreOfPlayer2.textContent = currentScore;
  setPlayer1AsStarter();
  await sleep(2500);
  if (snackBar.classList.contains('show')) snackBar.classList.remove('show');
};

const checkWinner = () => {
  if (player1Score >= 100) {
    // alert('player 1 wins');
    toggleSnackBar('Player 1 ');
    return true;
  }
  if (player2Score >= 100) {
    // alert('player 2 wins');
    toggleSnackBar('Player 2');
    return true;
  }
  return false;
};
const rollDiceFunction = () => {
  changeDiceImg();
  if (diceValue !== 1) {
    currentScore += diceValue;
    setCurrentScore();
  } else {
    currentScore = 0;
    setCurrentScore();
    switchPlayer();
  }
};
const holdScore = () => {
  setScore();
  if (checkWinner()) {
    resetGame();
  } else {
    currentScore = 0;
    setCurrentScore();
    switchPlayer();
  }
};

rollDiceBtn.addEventListener('click', rollDiceFunction);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', resetGame);
