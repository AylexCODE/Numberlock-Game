const lockIn_sound = new Audio("lock_in.wav");
const boxSnap_sound = new Audio("box_snap.wav");
const scoreResult_sound = new Audio("score_result.wav");
const btnDisabled_sound = new Audio("button_disabled.mp3");

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