const toolElements = document.querySelectorAll(".tool");
const continer = document.getElementById("continer");

const tools = {
  pickaxe: "stone",
  axe: "trunk",
  shovel: ["dirt", "grass"],
  shears: "leaves",
};


let handItem = ""; // The tool currently selected by the user

// Select all tool elements
toolElements.forEach(toolEl => {
    toolEl.addEventListener("click", () => {
        // Clear previously selected tools
        toolElements.forEach(el => el.classList.remove("selected"));

        // Set the new hand item from the element's id
        handItem = toolEl.id;
        console.log(handItem);

        // Add a visual indication (like border or background)
        toolEl.classList.add("selected");

        document.body.style.cursor = `url(./assets/${handItem}.webp), auto`;
    });
});


function clickRemove(div) {
  if(!tools[handItem].includes(div.classList[1]))return
  insertImg(div.classList[1])
  plusQuantity(div.classList[1])
  div.className = "cell";
}

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
