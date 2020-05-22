let countdown;
let isPaused = false;
let pauseSt = 0;
let pauseEnd = 0;

const timerDisplay = document.querySelector(".display__time-left");
const timeEndDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");
const pauseButton = document.querySelector(".pause__button");

pauseButton.addEventListener("click", pause);

buttons.forEach((b) =>
  b.addEventListener("click", function () {
    timer(this.dataset.time);
  })
);

//preventDefault!!
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  timer(parseInt(this.minutes.value) * 60);
});

function pause() {
  //already paused
  console.log("pause called");
  if (isPaused) {
    pauseEnd = Date.now();
    pauseButton.innerHTML = "pause";
  } else {
    pauseSt = Date.now();
    pauseButton.innerHTML = "continue";
  }
  isPaused = !isPaused;
}

function timer(seconds) {
  //clear any intervals in count down
  clearInterval(countdown);

  const now = Date.now();
  const then = now + 1000 * seconds;

  //set pause to false
  isPaused = false;
  pauseButton.innerHTML = "pause";
  pauseEnd = 0;
  pauseSt = 0;

  //display timer and comeback
  displayTime(seconds);
  displayTimeEndTime(then);

  if (timerDisplay.classList.contains("almost"))
    timerDisplay.classList.remove("almost");
  if (timerDisplay.classList.contains("goal"))
    timerDisplay.classList.remove("goal");

  countdown = setInterval(() => {
    if (isPaused) {
    } else {
      // console.log(pauseEnd - pauseSt);
      const secondsLeft = Math.round(
        (pauseEnd - pauseSt + then - Date.now()) / 1000
      );
      if (secondsLeft < 0) {
        audio.play();
        clearInterval(countdown);
        return;
      }
      // console.log(isPaused);

      //color text by check seconds left
      if (secondsLeft < 300 && secondsLeft >= 60) {
        if (!timerDisplay.classList.contains("almost"))
          timerDisplay.classList.add("almost");
      } else if (secondsLeft < 60) {
        if (timerDisplay.classList.contains("almost"))
          timerDisplay.classList.remove("almost");
        if (!timerDisplay.classList.contains("goal"))
          timerDisplay.classList.add("goal");
      }

      displayTime(secondsLeft);
    }
  }, 1000);
}

function displayTime(seconds) {
  const dspMin = Math.floor(seconds / 60);
  const dspSec = seconds % 60;
  const dispAll = `${dspMin}:${dspSec > 9 ? "" : "0"}${dspSec}`;
  timerDisplay.innerHTML = dispAll;
  document.title = dispAll;
  // console.log(dspMin, dspSec);
}

function displayTimeEndTime(then) {
  let endTime = new Date(then);
  const dispAll = `Come back at ${endTime.getHours()}:${
    endTime.getMinutes() > 9 ? "" : "0"
  }${endTime.getMinutes()}`;
  timeEndDisplay.textContent = dispAll;
  // timeEndDisplay.innerHTML = dispAll;
}
