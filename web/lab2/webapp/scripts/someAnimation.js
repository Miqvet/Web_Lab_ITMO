const buttonsY = document.getElementsByClassName("y");
let lastClickedButton = null;
const buttonReset = document.getElementById("reset")
function updateScore(){
    let score_counter = document.getElementsByClassName("result-in").length;
    let score = document.getElementById("score");
    score.innerHTML = "Score: " + score_counter;
}

