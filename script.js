"use strict";
//Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//setting scores of both players to 0
score0.textContent = 0;
score1.textContent = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //Toggle functions add the element if it is not present and remove the element if presents
  player1El.classList.toggle("player--active");
};
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;   //State Variable
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
  btnRoll.classList.remove("hide");
  btnHold.classList.remove("hide");
};
init();
//Rolling The Dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating a Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1, if true, switch player
    if (dice !== 1) {
      //Add Dice to the Current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Building Id name Dynamically
    } else {
      //Switch to next Player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add the current score to Active Player's Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if Players's Score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish Game
      playing = false;
      diceEl.classList.add("hidden");
      btnRoll.classList.add("hide");
      btnHold.classList.add("hide");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to the Next Player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
