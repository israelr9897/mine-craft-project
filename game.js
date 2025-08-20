const toolElements = document.querySelectorAll(".tool");
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
  if (!tools[handItem].includes(div.classList[1])) return
  updateImageStack(div.classList[1])
  div.className = "cell";
}

const allDivsList = []

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
