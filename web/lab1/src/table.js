import {updateScore} from "./someAnimation";

const clearButton = document.getElementById("clearTable");
// добавление результата в таблицу
export function addToTable(x, y, r, result, curr_time, exec_time) {

    let table = document.getElementById('myTable');
    let row = table.insertRow(-1);
    let className="cell-out";

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    if (result === 'Входит'){
        className = "cell-in";
    }
    cell1.textContent = "You at: " + curr_time +" for " + exec_time.toFixed(6);
    cell1.className = className;


    cell2.textContent = "["+x+";"+y+";"+r+"]";
    cell2.className = className;

    cell3.textContent = result;
    if (result === 'Входит'){
        cell3.className = "result-in"
    } else{
        cell3.className = "result-out";
    }

    updateScore();
}
export function saveTable(x, y, r, result, curr_time, exec_time){
    let currData = JSON.parse(localStorage.getItem("tableData")) || [];

    currData.push({x, y, r, result, curr_time, exec_time});
    localStorage.setItem('tableData', JSON.stringify(currData));
}
export function loadTable(){
    let savedData = JSON.parse(localStorage.getItem('tableData')) || [];

    savedData.forEach(data => {
        addToTable(data.x, data.y, data.r, data.result, data.curr_time, data.exec_time);
    })
}

clearButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});