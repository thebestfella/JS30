const slide = document.querySelector(".items");
let isDown = false;

//used to capture the initial capture location
let startX;
let scrollLeft;

//opt + cmd + up or down to work on multi-line
//shit + opt + up or down to copy a line
//opt + up or down to move a line
slide.addEventListener("mousedown", (e) => {
  isDown = true;
  slide.classList.add("active");
  //need to capture slide.offsetLeft in case theres margin, need to offset that
  //startX doesnt change when mouse is dragged
  startX = e.pageX - slide.offsetLeft;

  //also capture how much the slider has slid
  scrollLeft = slide.scrollLeft;
  //console.log(startX, e.pageX, slide.offsetLeft);
});

slide.addEventListener("mouseup", () => {
  isDown = false;
  slide.classList.remove("active");
});

slide.addEventListener("mouseleave", () => {
  isDown = false;
  slide.classList.remove("active");
});

slide.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  //will prevent browser from selecting the text of element on it
  e.preventDefault();

  //calculate the location of x, could be a gigantic number
  const x = e.pageX - slide.offsetLeft;
  //console.log(x);

  //how far have we deviated from the init loc
  const walk = x - startX;

  slide.scrollLeft = scrollLeft - walk;

  //let slScro = scrollLeft - walk;
  //console.log({ x, startX, walk, slScro });
});
