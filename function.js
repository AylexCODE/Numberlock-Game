const container = document.getElementById("container");
const guessBoxes = document.getElementsByClassName("guessBox");
const box = document.getElementById("box");
const placeBtn = document.getElementById("placeBtn");

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
    
let snapTo = [0, 0];
let resetGuessBox;
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable);
    
    resetGuessBox = function resetGuessBoxPosition(){
        gsap.set(box, {
            x: window.innerWidth / 2 - 25,
            y: window.innerHeight / 2 - 25
        });
    }
    resetGuessBox();
    
    Draggable.create(box, {
        type: "x,y",
        inertia: true,
        bounds: document.getElementsByTagName("body")[0],
        liveSnap: {
            points: function (point) {
                buttonState(false);
                
                for(const p of boxes){
                    const dx = point.x - p.x;
                    const dy = point.y - p.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 30) {
                        snapTo = [p.x, p.y];
                        return point;
                    }
                }
                snapTo = null;
                return point;
            }
        },
        onDragEnd: function(){
            if(snapTo){
                gsap.to("#box", {
                    x: snapTo[0],
                    y: snapTo[1],
                    delay: 0.2,
                    ease: "power2.inOut"
                });
                
                setTimeout(() => {buttonState(true); playBoxSnapSound();}, 400);
            }else{
                buttonState(false);
            }
        }
    });
    
});

let currentNumber = rng();
const numbers = [];
box.innerHTML = `<h2>${currentNumber}</h2>`;

function rng(){
    return Math.floor(Math.random() * 100);
}

function lockIn(){
    if(placeBtn.style.backgroundColor == "darkred"){
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
        placeBtn.style.backgroundColor = "darkgreen";
        placeBtn.style.color = "white";
        placeBtn.style.borderColor = "green";
    }else{
        placeBtn.style.backgroundColor = "darkred";
        placeBtn.style.color = "red";
        placeBtn.style.borderColor = "red";
    }
}

window.addEventListener("resize", function(){
    location.reload();
});