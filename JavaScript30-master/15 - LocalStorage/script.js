const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items"));
//const clear = document.querySelector(".plates");
//const checkAll = document.querySelector(".plates");
//const uncheckAll = document.querySelector(".plates");

function populateList(plates = [], platesList) {
  platesList.innerHTML;

  //output a string
  let temp = plates.map((plate, i) => {
    return `
    <li>
      <input type = "checkbox" data-index =${i} id = "item${i}" ${
      plate.done ? "checked" : ""
    }></input>
      <label for="item${i}">${plate.text}</label>
    </li>
    `;
  });
  //console.log(temp);
  //join the string together
  platesList.innerHTML = temp.join("");
}

function addItem(e) {
  //console.log(e);
  //to prevent page refresh
  e.preventDefault();
  //use this because this = form and text is in there
  const text = this.querySelector("[name=item]").value;
  const item = {
    text: text,
    done: false,
  };
  //console.log(item);

  items.push(item);
  populateList(items, itemsList);

  //only save string, items will be stored as items.toString()
  localStorage.setItem("items", JSON.stringify(items));

  //clean the form
  this.reset();
}

function toggleDone(e) {
  //make sure its an input
  if (!e.target.matches("input")) return;
  const el = e.target;
  //with dataset "daat-index =${i}"
  const index = el.dataset.index;
  items[index].done = !items[index].done;

  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}

//should cover more than button click,
addItems.addEventListener("submit", addItem);

//instead of set event listener to all items, its hard to add new ones
//as they are created, so what we are doing here is to put a even delegation
//to items parent(plates) structure and have it delegate an event when a
//child (items) is created
itemsList.addEventListener("click", toggleDone);

//populate the list and retrieve items from localStorage
populateList(items, itemsList);
