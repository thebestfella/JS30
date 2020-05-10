let countdown;

const timerDisplay = document.querySelector(".display__time-left");
const timeEndDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");

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

function timer(seconds) {
  //clear any intervals in count down
  clearInterval(countdown);

  const now = Date.now();
  const then = now + 1000 * seconds;

  //display timer and comeback
  displayTime(seconds);
  displayTimeEndTime(then);

  if (timerDisplay.classList.contains("almost"))
    timerDisplay.classList.remove("almost");
  if (timerDisplay.classList.contains("goal"))
    timerDisplay.classList.remove("goal");

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      new Audio("alarm_long.mp3").play();
      clearInterval(countdown);
      return;
    }

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
