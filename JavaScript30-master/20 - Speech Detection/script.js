window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
//recognizing while speaking and displaying
//if set to false then it will not populate instantaneously
recognition.interimResults = true;

//recognition.lang = "zh-TW";

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

//inside results
//confidence in decimal
//transcript in string
recognition.addEventListener("result", (e) => {
  //console.log(e.results);
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
    //console.log(transcript);
    if (transcript.includes("unicorn")) {
      console.log("🦄:I love you too!!");
    }
    if (transcript.includes("monkey")) {
      console.log("🐒:Go away...");
    }
    if (transcript.includes("lion")) {
      console.log("🦁:you suck...");
    }
  }

  //however this function ends after populating a result
});

recognition.addEventListener("end", recognition.start);

recognition.start();
