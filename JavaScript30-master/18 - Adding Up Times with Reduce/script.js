//find out where to get
//-----method 1
let liAll = document.querySelectorAll("[data-time]");

let timeTot = [0, 0, 0];

liAll.forEach((element) => {
  let t = element.dataset.time.split(":");
  let len = 3 - t.length;
  for (let i = 0; i < t.length; i++) {
    timeTot[i + len] += parseInt(t[i]);
  }
});
timeTot[1] += Math.floor(timeTot[2] / 60);
timeTot[2] %= 60;
timeTot[0] += Math.floor(timeTot[1] / 60);
timeTot[1] %= 60;
console.log(`method 1: ${timeTot[0]}hr ${timeTot[1]}min ${timeTot[2]}sec`);

//-----method 2

const timeNodes = Array.from(document.querySelectorAll("[data-time]"));
/*
const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds, 0);
*/
const seconds = timeNodes.reduce((total, node) => {
  let [mins, secs] = node.dataset.time.split(":").map(parseFloat);
  return total + mins * 60 + secs;
}, 0);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(`method 2: ${hours}hr ${mins}min ${secondsLeft}sec`);

//reduce time
