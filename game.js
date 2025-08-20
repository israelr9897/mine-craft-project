const continer = document.getElementById("continer");

function clickRemove(div) {
  div.className = "cell";
}

for (let i = 0; i < 100 * 30; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
//   if(i === 10 || i === 11) div.classList.add("leaves");
//   if(i === 110 || i === 111) div.classList.add("leaves");
  if (i >= 100 * 10 && i < 100 * 11) {
    div.classList.add("dirt-top");
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
