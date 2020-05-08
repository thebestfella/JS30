const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countDownTimer = document.querySelector(".time");

let timeUp = false;

let score = 0;
scoreBoard.textContent = 0;

let playLength = 10; //sec
countDownTimer.innerHTML = `${playLength}.00`;

//need it to store the last hole to ensure mole doesn't come up from same hole
let lastHoleInd;

let timer;

function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//essentially it's a get-me-a-random-dom-elements function
function randHole() {
  let h = lastHoleInd;
  while (h === lastHoleInd) {
    h = Math.floor(Math.random() * holes.length);
  }
  lastHoleInd = h;
  return holes[h];
}

function peep() {
  const time = randTime(200, 1000);
  const hole = randHole();
  // console.log(time, hole);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function countDown() {
  //clearn timer
  clearInterval(timer);

  let then = Date.now() + playLength * 1000;

  timer = setInterval(() => {
    let remain = then - Date.now();
    if (remain < 0) {
      clearInterval(timer);
      countDownTimer.innerHTML = `0.00`;
      return;
    }
    let sec = Math.floor(remain / 1000);
    let milSec = Math.round((remain % 1000) / 10);
    countDownTimer.innerHTML = `${sec}.${milSec > 9 ? "" : "0"}${milSec}`;
  }, 10);
}

function startGame() {
  score = 0;
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), playLength * 1000);
  countDown();
}

//you can siomulate click, but isTrusted in (e) will be false
function bonk(e) {
  if (e.isTrusted) console.log("cheater!!");
  console.log("hit #", this.dataset.id);
  score += 1;
  scoreBoard.textContent = score;
}

moles.forEach((m) => m.addEventListener("click", bonk));
