//event capture, propagation, bubbling and once

//capturing:  When an event is captured, it goes from out(top) to in(bottom)
//            before bubbling.

//bubbling:   click on the bottom(inner) element is also and act of clicking
//            the up(outer) elememts, triggers click outwards too

const divs = document.querySelectorAll("div");
const button = document.querySelector("button");

function logText(e) {
  console.log(this.classList.value);

  //top propagated after current element
  e.stopPropagation();
}

divs.forEach((div) => {
  //capture:true, event goes from top(outward) to bottom(inward)
  //          one two three
  //capture:false
  //          three two one
  div.addEventListener("click", logText, { capture: false });
});

button.addEventListener(
  "click",
  () => {
    console.log("button click");
  },
  //once:true this action will be unbinded after the event is triggered once
  //        could be useful for store checkout
  { once: true }
);
