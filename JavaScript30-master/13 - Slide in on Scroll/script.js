//a control mechanism that restrict how many times the function can run
//by implementing a wait function (in msec)
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  //window location
  //window.scrollY gives y loc of where the TOP of the window is at
  //window.innerHeight gives y dist of height of window
  //console.log(window.scrollY, window.innerHeight);
  let curBottomY = window.scrollY + window.innerHeight;

  sliderImages.forEach(function (img) {
    //since we want to fly the image in when we are at 1/2 of the image height (from the bottom of screen)
    //so we take curBottomY - imgY/2 as the render height
    let transitionY = curBottomY - img.height / 4;
    //console.log(img.offsetTop);

    //flag shows if we reach transition location
    let isHalfShown = transitionY > img.offsetTop;

    //shows what bottom img y is
    let imgBottomY = img.offsetTop + img.height;

    //flag shows if picture is offscreen
    let isScrolledPast = window.scrollY > imgBottomY;

    if (isHalfShown && !isScrolledPast) {
      img.classList.add("active");
    } else {
      //can comment out if dont want the img in and out
      img.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
