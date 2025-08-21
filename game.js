import { trees } from "./treesModels.js";

const toolElements = document.querySelectorAll(".tool"); // Select all tool elements
const continer = document.getElementById("continer");
const stackHtml = document.getElementById("stack");

//רשימה שמכילה את כל תאי העולם
const allDivsList = [];

// The tool currently selected by the user
let handItem = "";

// Tracks the currently selected tool
let selectedTool = null;

//האם נמצא במצב בניה
let activ = false;
//מצב הבניה בו נמצא
let action;

//מחסנית כמות התאים שנכרתו
const stack = {
  leaves: 0,
  trunk: 0,
  grass: 0,
  dirt: 0,
  stone: 0,
};

//כלי העבודה, ולמה מתאימים
const tools = {
  pickaxe: ["stone"],
  axe: ["trunk"],
  shovel: ["dirt", "grass"],
  shears: ["leaves"],
};

// // save game
// localStorage.setItem("gameState")

//יוצר עצים בצורה רנדומלית
function createTree(local) {
  const num = Math.floor(Math.random() * trees.length);
  trees[num].forEach((l) => {
    l.num.forEach((num) => {
      allDivsList[local - num].classList.add(l.class);
    });
  });
}

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

// פונקציה המוחקת אלמנט מהעולם
function cellRemove(div) {
  console.log("cellRemove");
  if (tools[handItem]?.some((item) => div.className.includes(item))) {
    updateImageStack(div.classList[1]);
    div.className = "cell";
  }
}

//פונקציה המאפסת אלמנט במחסנית
function reasetdivOnStack(quantity) {
  const divStack = document.getElementById(action);
  divStack.remove();
  quantity.remove();
  action = null;
  document.body.style.cursor = "default";
}

//פונקציה הבונה תא
function cellBuild(div) {
  console.log("cellBuild");
  div.classList.add(action);
  stack[action]--;
  const quantity = document.getElementById(`p-${action}`);
  if (stack[action] === 0) {
    reasetdivOnStack(quantity);
  } else {
    quantity.innerText = stack[action];
  }
}

//פונקציה שמופעלת בעת לחיצה על תא
function clickDiv(div) {
  console.log("clickDiv");
  if (div.className !== "cell") {
    cellRemove(div);
  } else if (action) {
    cellBuild(div);
  }
}

//פונקציה המחזירה מספר רנדומלי
function getNumRandom(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//פונקציה המחזירה רשימה של מיקומים רנדומליים ליצירת עצים
function getLocationForTrees() {
  const amountTrees = getNumRandom(7, 16);
  const treeLocal = [];
  for (let i = 0; i < amountTrees; i++) {
    const num = getNumRandom(904, 995);
    treeLocal.push(num);
  }
  return treeLocal;
}

//פונקציה המאתחלת עולם חדש
function createNewBord() {
  const treeLocal = getLocationForTrees();
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
    div.id = `cell-${i + 1}`;
    div.addEventListener("click", () => clickDiv(div));
    continer.appendChild(div);
    allDivsList.push(div);
  }
}

//פונקציה שמתחילה משחק
export function startrGame() {
  if (!allDivsList.length) {
    createNewBord();
  }
}

//פונקציה המעדכנת ויוצרת אלמנטים במחסנית
function updateImageStack(className) {
  if (stack[className] === 0) {
    const p = document.createElement("p");
    p.id = `p-${className}`;
    const div = document.createElement("div");
    div.classList.add(className);
    div.id = className;
    stackHtml.appendChild(div);
    stackHtml.appendChild(p);
    div.addEventListener("click", (event) => StartBuild(event));
  }
  stack[className]++;
  const quantity = document.getElementById(`p-${className}`);
  quantity.innerText = stack[className];
  quantity.classList.add("quantity");
}

//פונקציה המאתחלת מצב בניה
function StartBuild(event) {
  console.log("startBuild");
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

startrGame();
