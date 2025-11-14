const container = document.getElementById("boxesContainer");
const guessBoxes = document.getElementsByClassName("guessBox");
const box = document.getElementById("box");
const placeBtn = document.querySelector(".placeBtn");
const resetBtn = document.querySelector(".resetBtn");

let boxCount = 10, rngLimit = 100;
let snapTo = [0, 0];
let resetGuessBox;

const numbers = [];
let currentNumber = rng();

let boxes = [];
const dataBoxes = [];
    
function start(){
    playStartSound();
    document.getElementById("boxContainer").style.visibility = "visible";
    
    for(let i = 0; i < boxCount; i++){
        const guessBox = document.createElement("span");
        guessBox.id = `guessBox${i}`;
        guessBox.classList = "guessBox";
        guessBox.innerHTML = `<p>${i+1}</p>`;
        container.appendChild(guessBox);
    }
    
    Array.from(guessBoxes).forEach((box, i) => {
        boxes[i] = { x: box.getBoundingClientRect().x, y: box.getBoundingClientRect().y};
        dataBoxes[i] = { x: box.getBoundingClientRect().x, y: box.getBoundingClientRect().y};
    });
    box.innerHTML = `<h2>${currentNumber}</h2>`;
}

function setDifficulty(x, y){
    boxCount = x;
    rngLimit = y;
}

function rng(){
    let rand = Math.floor(Math.random() * rngLimit + 1);
    while(numbers.includes(rand)){
        rand = Math.floor(Math.random() * rngLimit + 1);
    }
    
    return rand;
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
        box.style.display = "none";
        resetBtn.style.display = "grid";
        placeBtn.style.display = "none";
        document.getElementById("boxContainer").style.visibility = "hidden";
        calc();
    }
}

function reset(restart){
    resetGuessBox();
    box.style.display = "grid";
    
    resetBtn.style.display = "none";
    placeBtn.style.display = "block";
    
    numbers.length = 0;
    container.replaceChildren();
    currentNumber = rng();
    if(restart){
        start(); BGMMusic();
    }
}

async function calc(){
    playScoreResultSound();
    for(let i = 0; i < boxCount; i++){
        let valid = 0;
        for(let j = 0; j < boxCount; j++){
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