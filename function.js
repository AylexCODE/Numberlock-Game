const container = document.getElementById("container");
const guessBoxes = document.getElementsByClassName("guessBox");
const box = document.getElementById("box");
const placeBtn = document.querySelector(".placeBtn");

let snapTo = [0, 0];
let resetGuessBox;

let currentNumber = rng();
const numbers = [];

for(let i = 0; i < 10; i++){
    const guessBox = document.createElement("span");
    guessBox.id = `guessBox${i}`;
    guessBox.classList = "guessBox";
    guessBox.innerHTML = `<p>${i+1}</p>`;
    container.appendChild(guessBox);
}
    
let boxes = []; const dataBoxes = [];
Array.from(guessBoxes).forEach((box, i) => {
    boxes[i] = { x: box.getBoundingClientRect().x, y: box.getBoundingClientRect().y};
    dataBoxes[i] = { x: box.getBoundingClientRect().x, y: box.getBoundingClientRect().y};
});
    
box.innerHTML = `<h2>${currentNumber}</h2>`;

function rng(){
    return Math.floor(Math.random() * 100);
}

function lockIn(){
    if(!placeBtn.classList.contains("clickable")){
        return playButtonDisabledSound();
    }

    buttonState(false);
    playLockInSound();
    boxes = boxes.filter((n) => {
        if(n.x == snapTo[0] && n.y == snapTo[1]){
            const boxIndex = dataBoxes.findIndex((box) => (box.x == n.x && box.y == n.y));
            numbers[boxIndex] = currentNumber;
            guessBoxes[boxIndex].innerHTML = `<h2>${currentNumber}</h2>`;
            guessBoxes[boxIndex].style.backgroundColor = "#CCCCCC";
        }else{
            return n;
        }
        currentNumber = rng();
        resetGuessBox();
        box.innerHTML = `<h2>${currentNumber}</h2>`;
    });
    
    if(boxes.length == 0){
        box.remove();
        calc();
    }
}

async function calc(){
    playScoreResultSound();
    for(let i = 0; i < 10; i++){
        let valid = 0;
        for(let j = 0; j < 10; j++){
            if(!(numbers[i] <= numbers[j])){
                valid++;
            }
        }
        if(valid == i){
            guessBoxes[i].style.backgroundColor = "#00FF00";
        }else{
            guessBoxes[i].style.backgroundColor = "#FF0000";
        }
        await new Promise(r => setTimeout(r, 100));
    }
}

function buttonState(state){
    if(state){
        placeBtn.classList.add("clickable");
    }else{
        placeBtn.classList.remove("clickable");
    }
}

window.addEventListener("resize", function(){
    location.reload();
});