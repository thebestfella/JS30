const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      //console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(`Dont have access to the webcam`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  //ensure that the canvas has the same size as the incomning video frames
  canvas.width = width;
  canvas.height = height;

  //16ms
  //use return so we can have control of it later on
  //filter: take the canvas image and alter the pixel rgb value
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    //take picture out
    let pixels = ctx.getImageData(0, 0, width, height);
    //alteration
    //pixels = redEffect(pixels);
    //pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    //set ghosting
    //ctx.globalAlpha = 0.8;
    //put picture back
    ctx.putImageData(pixels, 0, 0);
  }, 33);
}

function redEffect(pixels) {
  //r g b a hence +=4
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += -50;
    pixels.data[i + 1] += 100;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i];
    pixels.data[i + 100] = pixels.data[i + 1];
    pixels.data[i - 150] = pixels.data[i + 2];
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });
  // console.log(
  //   levels.rmin,
  //   levels.rmax,
  //   levels.gmin,
  //   levels.gmax,
  //   levels.bmin,
  //   levels.bmax
  // );

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    //145,192,148
    if (
      red >= levels.rmin &&
      red <= levels.rmax &&
      green >= levels.gmin &&
      green <= levels.gmax &&
      blue >= levels.bmin &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

function takePhoto() {
  //play sound
  snap.currentTime = 0;
  snap.play();

  //take data out of canvas
  const data = canvas.toDataURL("image/jpeg");

  //this link allows you to download the picture that you generated
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.textContent = "Download Image";
  //this adds photo to bottom of the screen
  link.innerHTML = `<img src="${data}" alt ="handsome Man"\>`;
  strip.insertBefore(link, strip.firstChild);
  //console.log(data);
}

getVideo();

//if can play then we will call paintToCanvas to put play
video.addEventListener("canplay", paintToCanvas);
