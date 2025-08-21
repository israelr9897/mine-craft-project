import { trees } from "./treesModels.js";

const toolElements = document.querySelectorAll(".tool"); // Select all tool elements
const continer = document.getElementById("continer");
const stackHtml = document.getElementById("stack");
const menuBtn = document.getElementById("btn1")
const newWorldBtn = document.getElementById("btn2")

const stack = {
  leaves: 0,
  trunk: 0,
  grass: 0,
  dirt: 0,
  stone: 0,
};

const tools = {
  pickaxe: ["stone"],
  axe: ["trunk"],
  shovel: ["dirt", "grass"],
  shears: ["leaves"],
};

// // save game
// localStorage.setItem("gameState")

function createTree(local) {
  const num = Math.floor(Math.random() * trees.length);
  trees[num].forEach((l) => {
    l.num.forEach((num) => {
      allDivsList[local - num].classList.add(l.class);
    });
  });
}

let handItem = ""; // The tool currently selected by the user
let selectedTool = null; // Tracks the currently selected tool

// Select all tool elements
toolElements.forEach((toolEl) => {
  toolEl.addEventListener("click", () => {
    if (selectedTool === toolEl) {
      // Same tool clicked again → unselect
      toolEl.classList.remove("selected");
      selectedTool = null;
      handItem = "";
      document.body.style.cursor = "auto";
    } else {
      // New tool selected
      toolElements.forEach((el) => el.classList.remove("selected")); // Clear previous
      toolEl.classList.add("selected"); // Highlight current

      handItem = toolEl.id;
      selectedTool = toolEl;

      // Update cursor to match selected tool icon
      changeCursor(handItem);
    }
  });
});

function changeCursor(img) {
  document.body.style.cursor = `url(./assets/${img}.png), auto`;
}

function clickRemove(div) {
  if (
    div.className !== "cell" &&
    tools[handItem]?.some((item) => div.className.includes(item))
  ) {
    updateImageStack(div.classList[1]);
    div.className = "cell";
  }
  else if (action) {
    if (div.className !== "cell") return
    div.classList.add(action);
    stack[action]--;
    const quantity = document.getElementById(`p-${action}`);
    if (!stack[action]) {
      const divStack = document.getElementById(action);
      divStack.remove();
      quantity.remove();
      action = null;
      document.body.style.cursor = "default";
      return;
    }
    quantity.innerText = stack[action];
  }
  return;
}

const allDivsList = [];

let lastNumber = null;

function getNumRandom(min, max) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
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
  if (!stack[className]) {
    const p = document.createElement("p");
    p.id = `p-${className}`;
    const div = document.createElement("div");
    // div.appendChild(p);
    div.classList.add(className);
    div.id = className;
    div.style = "border: 1.5px rgb(242, 28, 28) solid;";
    stackHtml.appendChild(div);
    stackHtml.appendChild(p);
    div.addEventListener("click", (event) => clickBuild(event));
  }
  stack[className]++;
  const quantity = document.getElementById(`p-${className}`);
  quantity.innerText = stack[className];
  quantity.classList.add("quantity");
}

let activ = false;
let action;

function clickBuild(event) {
  toolElements.forEach((el) => el.classList.remove("selected"));

  selectedTool = null;
  handItem = "";
  const imgName = event.target.className;
  if (!activ || imgName !== action) {
    changeCursor(imgName);
    activ = true;
    action = imgName;
  } else {
    document.body.style.cursor = "default";
    activ = false;
    action = null;
  }
}

menuBtn.addEventListener("click", (e) => {
  console.log(12);
  window.location.href = "index.html"
})

newWorldBtn.addEventListener("click", (e) => {
  localStorage.removeItem("gameState");
  window.location.href = "game.html";
})