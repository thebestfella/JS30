const hero = document.querySelector(".hero");
const text = hero.querySelector("h1");
const walk = 200; //100px

function shadow(e) {
  const w = hero.offsetWidth;
  const h = hero.offsetHeight;

  let { x: x, y: y } = e;

  //this is hero, as hero is what we listening on
  //e.target could be something else, its what triggers the event
  //let { offsetX: x, offsetY: y } = e;
  //if (this !== e.target) {
  //x += e.target.offsetLeft;
  //y += e.target.offsetTop;
  //}

  //console.log(x, y);

  const xWalk = Math.round((x * walk) / w - walk / 2);
  const yWalk = Math.round((y * walk) / h - walk / 2);

  //x y blur color
  text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
  ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
  ${yWalk}px ${xWalk - 1}px 0 rgba(0,255,0,0.7),
  ${yWalk * -1}px ${xWalk - 1}px 0 rgba(255,0,0,0.7)
  `;
}

//its monitoring location of the mouse, however if the cursor is inside
//the child element of hero, then the x,y will be the actual location
//of the hover, however if just use x, y from e. then everything is fine
hero.addEventListener("mousemove", shadow);
