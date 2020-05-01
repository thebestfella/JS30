const nav = document.querySelector("#main");

const topOfNav = nav.offsetTop;

function fixNav() {
  //when these two are the same => scroll over tip of the top bar
  //console.log(topOfNav, window.scrollY);
  if (window.scrollY >= topOfNav) {
    //adding it here programmatically for 2 reasons
    //1. Once i set add class (fixed-nav) it will be fixed which
    //   doesnt take Y space, so the bottom element will scroll up
    //   automatically, and make bar jump a segment
    //2. Set it here instead of hardcoding it in css is because we
    //   don't know exactly how much Y it would be.
    document.body.style.paddingTop = nav.offsetHeight + "px";
    document.body.classList.add("fixed-nav");
  } else {
    document.body.style.paddingTop = "0px";
    document.body.classList.remove("fixed-nav");
  }
}

window.addEventListener("scroll", fixNav);
