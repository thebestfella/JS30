const msg = new SpeechSynthesisUtterance();
//speech is dumped into
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

msg.text = document.querySelector(`[name="text"]`).value;

//populate when a page is loaded
function populateVoices() {
  voices = this.getVoices();
  //console.log(voices);
  voicesDropdown.innerHTML = voices
    .filter((v) => v.lang.includes("en"))
    .map(
      (voice) =>
        `<option value = "${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

//when a new voice is selected
function setVoice() {
  msg.voice = voices.find((v) => v.name === this.value);
  toggle();
  //console.log(this.value, msg.voice);
}

//toggle onoff during a switch or stop
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  //console.log(this.name, this.value, msg);
  //change pitch or rate or text
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((op) => op.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);

//how to pass argument with evenlistener
stopButton.addEventListener("click", () => toggle(false));
//stopButton.addEventListener("click", toggle.bind(null, false));
