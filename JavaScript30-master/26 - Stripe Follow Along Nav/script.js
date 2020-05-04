const triggers = document.querySelectorAll(".cool > li"); //what does it mean??
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

function handleEnter() {
  // will provide two stage display when mouse is hoovered
  this.classList.add("trigger-enter");
  setTimeout(() => {
    //make sure the enter is added before changing opacity.
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 150);

  //deal with the background - white div
  background.classList.add("open");
  //select dropdown inside "this". should get them first for better performance?
  const dropdown = this.querySelector(".dropdown");
  //getBoundingClientRect gives coords absolute relative to the page
  //so we should use h and w from dropdown
  const dropdownCoords = dropdown.getBoundingClientRect();
  //and x y from nav to offset
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  background.style.setProperty("width", `${coords.width}px`);
  background.style.setProperty("height", `${coords.height}px`);
  background.style.setProperty(
    "transform",
    `translate(${coords.left}px,${coords.top}px)`
  );

  //console.log(dropdownCoords);
  //console.log(navCoords);
}

function handleLeave() {
  //console.log(this);
  this.classList.remove("trigger-enter", "trigger-enter-active");

  //white div
  background.classList.remove("open");
}

triggers.forEach((trig) => trig.addEventListener("mouseenter", handleEnter));

triggers.forEach((trig) => trig.addEventListener("mouseleave", handleLeave));
