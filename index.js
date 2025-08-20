const newGameBtn = document.getElementById("btn1");
  const continueBtn = document.getElementById("btn2");

  newGameBtn.addEventListener("click", () => {
    localStorage.removeItem("gameState");
    window.location.href = "game.html"; 
  });

  continueBtn.addEventListener("click", () => {
    const state = localStorage.getItem("gameState");
    if (state) {
      window.location.href = "game.html";
    } else {
      alert("אין משחק שמור!");
    }
  });