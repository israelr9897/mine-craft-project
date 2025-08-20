const tools = {
  pickaxe: "stone",
  axe: "trunk",
  shovel: "dirt",
  shears: "leaves"
};


let handItem = ""; // The tool currently selected by the user

// Select all tool elements
const toolElements = document.querySelectorAll(".tool");

toolElements.forEach(toolEl => {
  toolEl.addEventListener("click", () => {
    // Clear previously selected tools
    toolElements.forEach(el => el.classList.remove("selected"));

    // Set the new hand item from the element's id
    handItem = toolEl.id;
    console.log(handItem);
    
    // Add a visual indication (like border or background)
    toolEl.classList.add("selected");

    if (block === tools.handItem) {
        // for the select block
    }

    document.body.style.cursor = `url(./assets/${handItem}.webp), auto`;
  });
});

