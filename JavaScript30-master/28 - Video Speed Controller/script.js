console.log("test");

const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");

console.log("test");

//use a proper function to get "this" to be the speed bar
//use arrow to get window
speed.addEventListener("mousemove", function (e) {
  //console.log(e, this);

  const y = e.pageY - this.offsetTop;
  const decimal = y / this.offsetHeight;

  //display the height with percentage
  const heighPercent = Math.round(decimal * 100) + "%";
  bar.style.height = heighPercent;

  //chang display text
  const min = 0.4;
  const max = 3;
  const xSpeed = decimal * (max - min) + min;
  bar.textContent = xSpeed.toFixed(1) + "x";

  //change actual play back speed
  video.playbackRate = xSpeed;
});
