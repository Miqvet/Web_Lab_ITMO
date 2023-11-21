window.addEventListener("load",() => {
    loadForm();
    updateScore();
    drawCoordsPlane(getValuesFromArrayOfObj(getRForm()).at(-1));
});
window.addEventListener("beforeunload",() => {
    saveValue()
});

const xField = document.getElementById("form_x");
const yFields = document.getElementsByClassName("y");
const rFields = document.getElementsByClassName("r");
let checkedRFields;
let checkedYFields;
for(let counter = 0; counter < rFields.length; counter++){
    rFields[counter].addEventListener('click', () =>{
        drawCoordsPlane(getValuesFromArrayOfObj(getRForm()).at(-1));
    })
}

function saveValue() {

    // сохранение x
    localStorage.setItem("xValues", getX());

    //сохранение y
    localStorage.setItem("yValues", JSON.stringify(getValuesFromArrayOfObj(getYForm())));

    //сохранение r
    localStorage.setItem("rValues", JSON.stringify(getValuesFromArrayOfObj(getRForm())));
    console.log(getX(),getValuesFromArrayOfObj(getYForm()), getValuesFromArrayOfObj(getRForm()));
}
// загрузка данных из хранилища
function loadForm() {
    // загрузка x
    if (localStorage.getItem("xValues") !== null) {
        xField.value = localStorage.getItem("xValues");
    }

    //загрузка y тип checkbox
    checkedYFields = JSON.parse(localStorage.getItem("yValues"));
    if (checkedYFields !== null) {
        for(let i = 0; i < yFields.length; i ++){
            for(let j = 0; j < checkedYFields.length; j ++){
                if(yFields[i].value === checkedYFields[j]){
                    yFields[i].checked = true;
                }
            }
        }
    }
    //загрузка r тип checkbox
    checkedRFields = JSON.parse(localStorage.getItem("rValues"));
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
function getValuesFromArrayOfObj(array){
    //сохранение r
    let counterOfValues = 0;
    let values = [];
    for(let i = 0; i < array.length; i++){
        values[counterOfValues++] = array[i].value;
    }
    return values;
}