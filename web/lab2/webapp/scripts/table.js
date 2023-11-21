const clearButton = document.getElementById("clearTable");
// добавление результата в таблицу
function addToTable(x, y, r, result, time) {

    let table = document.getElementById('myTable');
    let row = table.insertRow(0);
    let className="cell-out";
    let data = toCanvasCoords(x, y, r, 230);

    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);
    const cell2 = row.insertCell(2);

    if (result === 'Yea'){
        className = "cell-in";
    }
    cell0.textContent = time;
    cell0.className = className;

    cell1.textContent =  `[${x},${y},${r}]`
    cell1.className = className;

    cell2.textContent = result;
    if (result === 'Yea'){
        cell2.className = "result-in";
    } else{
        cell2.className = "result-out";
    }
    updateScore();
    let selectedR = getValuesFromArrayOfObj(getRForm()).at(-1);
    selectedR += ".0";
    if(selectedR === r){
        drawPoint(data.x,data.y,result === 'Yea' ? "rgb(39,252,1)" : 'rgb(255,0,0)')
    }
}

clearButton.addEventListener("click", () => {
    location.reload();
});