const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

//check "a ", "the ", "an " and case insensitive
//trim is used to trim whitespace from start or end
function strip(name) {
  return name.replace(/^(a |the |an )/i, "").trim();
}

const articles = ["The", "A", "An"];

let sortedBands = bands.sort((a, b) => {
  let x = a.split(" ");
  let y = b.split(" ");
  x = articles.includes(x[0]) ? x.slice(1) : x;
  y = articles.includes(y[0]) ? y.slice(1) : y;

  return x[0] > y[0] ? 1 : -1;
});

//console.log(sortedBands);

//use # to get id
//without join what will happen is that map will return an array
//and put array to innerHTML will result in innerHTML calling a
//toString() toconvert array to string, and there will be extra ","
//between each <li> elements
document.querySelector("#bands").innerHTML = sortedBands
  .map((band) => `<li>${band}</li>`)
  .join("");
