import { trees } from "./treesModels.js";

const toolElements = document.querySelectorAll(".tool"); // Select all tool elements
const continer = document.getElementById("continer");
const stackHtml = document.getElementById("stack")



const stack = {
  leaves: 0,
  trunk: 0,
  grass: 0,
  dirt: 0,
  stone: 0
}

const tools = {
  pickaxe: "stone",
  axe: "trunk",
  shovel: ["dirt", "grass"],
  shears: "leaves",
};


function createTree(local) {
  const num = Math.floor(Math.random() * trees.length)
  trees[num].forEach((l) => {
    l.num.forEach((num) => {
      allDivsList[local - num].classList.add(l.class);
    });
  });
}

let handItem = ""; // The tool currently selected by the user
let selectedTool = null; // Tracks the currently selected tool

// Select all tool elements
toolElements.forEach(toolEl => {
  toolEl.addEventListener("click", () => {
    if (selectedTool === toolEl) {
      // Same tool clicked again → unselect
      toolEl.classList.remove("selected");
      selectedTool = null;
      handItem = "";
      document.body.style.cursor = "auto";
    } else {
      // New tool selected
      toolElements.forEach(el => el.classList.remove("selected")); // Clear previous
      toolEl.classList.add("selected"); // Highlight current

      handItem = toolEl.id;
      selectedTool = toolEl;


      // Update cursor to match selected tool icon
      changeCursor()
    }
  });
});


function changeCursor() {
  document.body.style.cursor = `url(./assets/cursor/${handItem}.png), auto`;
}

function clickRemove(div) {
  if (!tools[handItem].includes(div.classList[1])) return
  updateImageStack(div.classList[1])
  div.className = "cell";
}

const allDivsList = []

let lastNumber = null;

function getNumRandom(min, max) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("fun num:" , num);
  } while (
    lastNumber !== null &&
    (num === lastNumber || Math.abs(num - lastNumber) === 1)
  );

  lastNumber = num;
  return num;
}

const amountTrees = getNumRandom(7, 16);
const treeLocal = [];
for (let i = 0; i < amountTrees; i++) {
  const num = getNumRandom(904, 995);
  console.log(num);
  treeLocal.push(num);
}

for (let i = 0; i < 100 * 30; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
  if (treeLocal.includes(i)) createTree(i - 1);
  if (i >= 100 * 10 && i < 100 * 11) {
    div.classList.add("grass");
  } else if (i >= 100 * 11 && i < 100 * 15) {
    div.classList.add("dirt");
  } else if (i >= 100 * 15 && i < 100 * 28) {
    div.classList.add("stone");
  } else if (i >= 100 * 28) {
    div.classList.add("bedrock");
  }
  div.id = `cell-${i}`;
  div.addEventListener("click", () => clickRemove(div));
  continer.appendChild(div);
  allDivsList.push(div);
}


// function lessQuantity() {
//   const quantity = document.querySelector("quantity");
//   quantity--;
// }

function updateImageStack(className) {
  if(!stack[className]){
    const p = document.createElement("p")
    p.id = `p-${className}`
    const div = document.createElement("div")
    div.appendChild(p)
    div.classList.add(className)
    stackHtml.appendChild(div)
  }
  stack[className]++
  const quantity = document.getElementById(`p-${className}`)
  quantity.innerText = stack[className]
  quantity.classList.add("quantity")
}


// function clickBuild() {
//   const resource = document.getElementById()
//   resource.addEventListener("click", (e) => {

//   })
// }
