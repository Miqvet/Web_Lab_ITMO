function setLastClickedButton(e){
    document.getElementById("x").value = e;
}

function updateScore(){
    let score_counter = document.getElementsByClassName("result-in").length;
    let score = document.getElementById("score");
    score.innerHTML = "Score: " + score_counter;
    drawCoordsPlane($('#myForm\\:decimal').val())
}


const btns = document.getElementsByClassName("submit-btn");
for(let counter = 0; counter < btns.length; counter++){
    btns[counter].addEventListener('click', function (){
        window.close();
    })
}
window.addEventListener("load",() => {
    loadForm();
});
window.addEventListener("beforeunload",() => {
    saveValue()
});

function saveValue() {
    // сохранение y
    localStorage.setItem("y", document.getElementById("y").value);
}
// загрузка данных из хранилища
function loadForm() {
    // загрузка y
    if (localStorage.getItem("y") !== null) {
        document.getElementById("y").value = localStorage.getItem("y");
    }
}
window.updateCanvas = function updateCanvas(event, ui) {
    const r = ui.value;
    updateScore()
    $("#update-radius\\:radius").val(r);
    $("#update-radius\\:updateCanvas").click();
}

window.updateX = function updateX(x) {
    $("#update-x\\:xValBTN").val(x);
    $("#update-x\\:updateXVal").click();
}
