const titleScreen = document.querySelector(".titleScreen");
const gameScreen = document.querySelector(".gameContainer");

function play(){
    titleScreen.classList.remove("active");
    gameScreen.classList.add("active");
    
    start();
    BGMMusic();
}

function stop(){
    titleScreen.classList.add("active");
    gameScreen.classList.remove("active");
    
    reset(false);
}