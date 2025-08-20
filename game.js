import { trees } from "./treesModels.js";

const toolElements = document.querySelectorAll(".tool");
const continer = document.getElementById("continer");

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

// Select all tool elements
toolElements.forEach((toolEl) => {
  toolEl.addEventListener("click", () => {
    // Clear previously selected tools
    toolElements.forEach((el) => el.classList.remove("selected"));

    // Set the new hand item from the element's id
    handItem = toolEl.id;
    console.log(handItem);

    // Add a visual indication (like border or background)
    toolEl.classList.add("selected");

    document.body.style.cursor = `url(./assets/${handItem}.webp), auto`;
  });
});

function clickRemove(div) {
  if (!tools[handItem].includes(div.classList[1])) return;
  insertImg(div.classList[1]);
  plusQuantity(div.classList[1]);
  div.className = "cell";
}

const allDivsList = [];

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

function plusQuantity(quantityKind) {
  const quantity = document.getElementById(quantityKind + "Quantity");
  if (quantity.innerText === undefined) {
    quantity.innerText = 0;
  }
  quantity.innerText++;
}

function lessQuantity() {
  const quantity = document.querySelector("quantity");
  quantity--;
}

function insertImg(imgKind) {
  const img = document.getElementById(imgKind + "Img");
  if (imgKind === "leaves") {
    img.src = "assets/leaves.png";
    img.alt = "leaves";
  } else if (imgKind === "trunk") {
    img.src = "assets/trunk.png";
    img.alt = "trunk";
  } else if (imgKind === "grass") {
    img.src = "assets/grass.png";
    img.alt = "grass";
  } else if (imgKind === "dirt") {
    img.src = "assets/dirt.png";
    img.alt = "dirt";
  } else if (imgKind === "stone") {
    img.src = "assets/stone.png";
    img.alt = "stone";
  }
}
