// 👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀

const triggers = document.querySelectorAll("a");
const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

function highlightLink(e) {
  //getBoundingClientRect can get the bound, x, y, left, right, wid, height, top, bottom
  //y means how close you are to the top of viewport (not page),
  const linkCoords = this.getBoundingClientRect();
  //console.log(this.text, linkCoords.y, window.scrollY);
  highlight.style.width = `${linkCoords.width}px`;
  highlight.style.height = `${linkCoords.height}px`;

  //thereforce needs to compensate the scroll y value.
  //because traslate use coord system thats relative to the top of the page, not viewport
  highlight.style.transform = `translate(${linkCoords.x + window.scrollX}px,${
    linkCoords.y + window.scrollY
  }px)`;
}

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", highlightLink)
);
