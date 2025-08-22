import { trees } from "./treesModels.js";

const toolElements = document.querySelectorAll(".tool"); // Select all tool elements
const continer = document.getElementById("continer");
const stackHtml = document.getElementById("stack");
const menuBtn = document.getElementById("btn1")
const newWorldBtn = document.getElementById("btn2")

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
  saveGame()
}

//פונקציה המאפסת אלמנט במחסנית
function reasetdivOnStack(quantity) {
  const divStack = document.getElementById(action);
  divStack.remove();
  quantity.remove();
  action = null;
  document.body.style.cursor = "default";
  // 
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
  saveGame()
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
  saveGame()
}

//פונקציה שמתחילה משחק
export function startrGame() {
  const savingGame = localStorage.getItem("gameState")
  if (!savingGame) {
    createNewBord();
  } else {
    loadSavingGame(savingGame)
  }
}

function saveGame() {
  const grid = allDivsList.map(div => div.className) // saving the world state
  const inv = {...stack} // saving the stack state
  const state = {grid, inv}
  localStorage.setItem("gameState", JSON.stringify(state))
}

function loadSavingGame(savingGame) {
  const {grid, inv} = JSON.parse(savingGame)
   // load board
  buildBoardFromGrid(grid);

  // load inventory
  restorStack(inv);
}

function buildBoardFromGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    const div = document.createElement("div");
    div.className = grid[i];     
    div.id = `cell-${i + 1}`;
    div.addEventListener("click", () => clickDiv(div));
    continer.appendChild(div);
    allDivsList.push(div);
  }
}

function restorStack(inv) {
  Object.keys(inv).forEach(key => {
    for (let i = 0; i < inv[key]; i++) {
      if (stack[key] === 0) {
      const p = document.createElement("p");
      p.id = `p-${key}`;
      const div = document.createElement("div");
      div.classList.add(key);
      div.id = key;
      stackHtml.appendChild(div);
      stackHtml.appendChild(p);
      div.addEventListener("click", (event) => StartBuild(event));
      }
      stack[key]++;
      const quantity = document.getElementById(`p-${key}`);
      quantity.innerText = stack[key];
      quantity.classList.add("quantity");
    }
  })
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
  saveGame()
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

menuBtn.addEventListener("click", (e) => {
  console.log(12);
  window.location.href = "index.html"
})

newWorldBtn.addEventListener("click", (e) => {
  localStorage.removeItem("gameState");
  window.location.href = "game.html";
})

startrGame();






// === Viewport Edge Auto-Scroll (no click needed) ===
// Scrolls the page (window) automatically when the mouse approaches the screen edges.
// All comments are in English.

(function enableViewportEdgeAutoScroll() {
  const EDGE = 40;          // px near edge that triggers auto-scroll
  const MAX_SPEED = 1200;   // px per second at the very edge

  let mouseX = 0, mouseY = 0;
  let rafId = null;
  let lastTs = 0;
  let active = false;

  // Start / stop helpers
  function stop() {
    active = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // 0..EDGE distance -> 0..MAX_SPEED speed
  function speedFromDistance(d) {
    const t = Math.max(0, Math.min(1, (EDGE - d) / EDGE)); // 0..1
    return t * MAX_SPEED; // px/s
  }

  function tick(ts) {
    if (!active) return;
    if (!lastTs) lastTs = ts;
    const dt = Math.min(32, ts - lastTs) / 1000; // seconds; clamp spikes
    lastTs = ts;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // distances from viewport edges
    const leftD   = mouseX;
    const rightD  = vw - mouseX;
    const topD    = mouseY;
    const bottomD = vh - mouseY;

    let vx = 0, vy = 0; // + right/down, - left/up
    if (leftD < EDGE)         vx = -speedFromDistance(leftD);
    else if (rightD < EDGE)   vx =  speedFromDistance(rightD);

    if (topD < EDGE)          vy = -speedFromDistance(topD);
    else if (bottomD < EDGE)  vy =  speedFromDistance(bottomD);

    if (vx !== 0 || vy !== 0) {
      // clamp to page bounds
      const doc = document.documentElement;
      const maxX = Math.max(0, doc.scrollWidth  - vw);
      const maxY = Math.max(0, doc.scrollHeight - vh);

      const curX = window.scrollX || 0;
      const curY = window.scrollY || 0;

      let dx = vx * dt;
      let dy = vy * dt;

      if (curX + dx < 0)      dx = -curX;
      else if (curX + dx > maxX) dx = maxX - curX;

      if (curY + dy < 0)      dy = -curY;
      else if (curY + dy > maxY) dy = maxY - curY;

      if (dx || dy) window.scrollBy(dx, dy);
    }

    // stop loop when cursor leaves the edge zone
    if (vx === 0 && vy === 0) {
      active = false;
      rafId = null;
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  // track mouse globally
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) {
      active = true;
      lastTs = 0;
      rafId = requestAnimationFrame(tick);
    }
  });

  window.addEventListener('blur', stop);
  document.addEventListener('mouseleave', stop);
})();
