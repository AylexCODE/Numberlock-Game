const lockIn_sound = new Audio("../assets/sounds/lock_in.ogg");
const boxSnap_sound = new Audio("../assets/sounds/box_snap.ogg");
const scoreResult_sound = new Audio("../assets/sounds/score_result.ogg");
const btnDisabled_sound = new Audio("../assets/sounds/button_disabled.ogg");

function playButtonDisabledSound(){
    btnDisabled_sound.pause();
    btnDisabled_sound.currentTime = 0;
    btnDisabled_sound.play();
}

function playLockInSound(){
    lockIn_sound.pause();
    lockIn_sound.currentTime = 0;
    lockIn_sound.play();
}

function playScoreResultSound(){
    scoreResult_sound.pause();
    scoreResult_sound.currentTime = 0;
    scoreResult_sound.play();
}

function playBoxSnapSound(){
    boxSnap_sound.pause();
    boxSnap_sound.currentTime = 0;
    boxSnap_sound.play();
}