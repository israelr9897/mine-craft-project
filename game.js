const toolElements = document.querySelectorAll(".tool"); // Select all tool elements
const continer = document.getElementById("continer");

const tools = {
  pickaxe: "stone",
  axe: "trunk",
  shovel: ["dirt", "grass"],
  shears: "leaves",
};

let handItem = ""; // The tool currently selected by the user
let selectedTool = null; // Tracks the currently selected tool

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
  if(!tools[handItem].includes(div.classList[1]))return
  insertImg(div.classList[1])
  plusQuantity(div.classList[1])
  div.className = "cell";
}

const allDivsList = [];

for (let i = 0; i < 100 * 30; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
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
  allDivsList.push(div)
}
console.log(allDivsList);

function plusQuantity(quantityKind) {
  const quantity = document.getElementById(quantityKind + "Quantity")
  if (quantity.innerText === undefined) {
      quantity.innerText = 0
  }
  quantity.innerText++
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
