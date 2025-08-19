const continer = document.getElementById("continer")

for (let i = 0; i < 100 * 30; i++) {
    const div = document.createElement("div")
    div.classList.add("cell")
    if(i >= 100 * 10 && i < 100 * 11){
        div.classList.add("dirt-top")
        
    }
    else if(i >= 100 * 11 && i < 100 * 15){
        div.classList.add("dirt")
        
    }
    else if(i >= 100 * 15 && i < 100 * 28){
        div.classList.add("stone")
        
    }
    else if(i >= 100 * 28){
        div.classList.add("bedrock")
    }
    continer.appendChild(div)
}