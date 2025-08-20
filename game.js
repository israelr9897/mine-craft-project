const toolElements = document.querySelectorAll(".tool");
const continer = document.getElementById("continer");

const tools = {
  pickaxe: "stone",
  axe: "trunk",
  shovel: "dirt",
  shears: "leaves"
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
  div.className = "cell";
}

for (let i = 0; i < 100 * 30; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
//   if(i === 10 || i === 11) div.classList.add("leaves");
//   if(i === 110 || i === 111) div.classList.add("leaves");
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

  div.addEventListener("click", () => {
    if(div.classList === "cell"){
      div.classList.add("dirt")
    }
    console.log(div.classList);
  })
}
