//---get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const fullScreen = player.querySelector(".fullScreen");

const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");

//---build functions
function togglePLay() {
  video.paused ? video.play() : video.pause();
}
function updatePlayButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}
function skip() {
  //console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  //console.log(e.offsetX);
  const scrubT = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubT;
}
function fs() {
  console.log("fs");
  //easy way but css doesn't work anymore
  video.webkitRequestFullScreen();
}

//---hook up evenlisteners

//click on video to toggle
video.addEventListener("click", togglePLay);
//change play/pause icon
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
//click on play button to toggle
toggle.addEventListener("click", togglePLay);

//click on to skip(forward or backward) hook up to anything with data-skip attribute
skipButtons.forEach((button) => button.addEventListener("click", skip));
//drag to get range slider
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
//only update it when click down
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
//listen to video time update event to update bar progress
video.addEventListener("timeupdate", handleProgress);

let mouseDown = false;
//listen to drag on progress bar
progress.addEventListener("click", scrub);
//listen to mouse moved on the prograss(not just bar)
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
//following two EL toggle the mouseDown
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

//extra feature - fullscreen
fullScreen.addEventListener("click", fs);
