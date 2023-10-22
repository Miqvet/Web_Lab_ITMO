const buttonsY = document.getElementsByClassName("y");
let lastClickedButton = null;
const buttonReset = document.getElementById("reset")
// Начало модуля для работы с анимацией последней нажатой кнопкой
export function setLastClickedButton(e){
    lastClickedButton = e;
}

buttonReset.addEventListener("click", function(){
    if(lastClickedButton !== null){
        lastClickedButton.classList.remove("small");
    }
});

for (let i = 0; i < buttonsY.length; i++) {
    buttonsY[i].addEventListener("click", function() {
        if (lastClickedButton !== this){
            if (lastClickedButton !== null) {
                lastClickedButton.classList.remove("small");
            }
            if (this !== lastClickedButton) {
                this.classList.add("small");
            }
        }

        lastClickedButton = this;
        document.querySelector('input[name="y"]').value = this.value;
    });
}
// анимация счётчика
export function updateScore(){
    let score_counter = document.getElementsByClassName("result-in").length;
    let score = document.getElementById("score");
    score.innerHTML = "Score: " + score_counter;
}

