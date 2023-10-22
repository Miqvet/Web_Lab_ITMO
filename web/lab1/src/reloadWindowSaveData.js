import {getRForm, getX, getY} from "./index";
import {loadTable} from "./table";
import {setLastClickedButton} from "./someAnimation";
window.addEventListener("load",() => {
    loadTable();
    loadForm();
});
window.addEventListener("beforeunload",() => {
    saveValue()
});

const xField = document.getElementById("form_x");
const yField = document.getElementById('form_y');
const yButtons = document.getElementsByClassName('y');
const rFields = getRForm();
let checkedRFields;
let counterOfR;
let rValues;

function saveValue() {
    // сохранение x
    localStorage.setItem("xField", getX());

    //сохранение y
    localStorage.setItem("yField", getY());

    //сохранение r
    counterOfR = 0;
    rValues = [];
    for(let i = 0; i < rFields.length; i++){
        if(rFields[i].checked){
            rValues[counterOfR++] = rFields[i].value;
        }
    }
    localStorage.setItem("rField", JSON.stringify(rValues));
}
// загрузка данных из формаъ
function loadForm() {
    // загрузка x
    if (localStorage.getItem("xField") !== null) {
        xField.value = localStorage.getItem("xField");
    }
    // загрузка y
    if (localStorage.getItem("yField") !== null) {
        yField.value = localStorage.getItem("yField");
        for(let i = 0; i < yButtons.length; i ++){
            if(yButtons[i].value === yField.value){
                yButtons[i].classList.add("small")
                setLastClickedButton(yButtons[i]);
            }
        }
    }

    //загрузка r
    checkedRFields = JSON.parse(localStorage.getItem("rField"));
    if (checkedRFields !== null) {
        for(let i = 0; i < rFields.length; i ++){
            for(let j = 0; j < checkedRFields.length; j ++){
                if(rFields[i].value === checkedRFields[j]){
                    rFields[i].checked = true;
                }
            }
        }
    }
}