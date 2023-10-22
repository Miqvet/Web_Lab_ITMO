import {addToTable, saveTable} from './table'
import {validate, validateCoordinates} from "./validator";
const myForm = document.getElementById('mainForm');
const today = new Date();
// Блок геттеров для получения данных из формы

// TODO camelCase
export function getX() {
    return document.getElementById('form_x').value;
}

export function getY() {
    return document.getElementById('form_y').value;
}

export function getRForm() {
    return document.getElementsByClassName('r');
}

// Функция отправки данных на сервер
function fetchData(x, y, r) {
    // TODO template string
    const url = `form.php?x=${x}&y=${y}&r=${r}`; // Замените URL на ваш API URL
    fetch(url, {
        method: 'GET',
    }).then(
        response => {
            return response.text();
        }
    ).then(result => {
        let responseData = JSON.parse(result);
        saveTable(x, y, r, responseData.result, today.toLocaleString(), responseData.exec_time);
        addToTable(x, y, r, responseData.result, today.toLocaleString(), responseData.exec_time);
    })
        .catch(error => {
            // красивые алерты
            Toastify({
                text: `There was an error processing your request: ${error.message}`,
                className: "error",
                style: {
                    background: "linear-gradient(to right, #ff00b, #ff12d)",
                    border: "1px solid white"
                },
                offset: {
                    x: 10,
                    y: 60
                },
                position: "left",
            }).showToast();
        })
}


// Добавляем обработчик события отправки формы
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        x: getX(),
        y: getY(),
        r: getRForm()
    }
    let validateFlag = false;
    for (let i = 0; i < data.r.length; i++) {
        if (data.r[i].checked) {
            if (validateCoordinates(data.x,data.y,data.r[i].value)){
                fetchData(data.x, data.y, data.r[i].value);
            }else if (!validateFlag){
                Toastify({
                    text: 'Ошибка валидации',
                    className: "error",
                    style: {
                        background: "linear-gradient(to right, #10000b, #1012d)",
                        border: "1px solid white"
                    },
                    offset: {
                        x: 10,
                        y: 60
                    },
                    position: "left",
                }).showToast();
                validateFlag = true;
            }
        }
    }

    //let response = validate(data.x, data.y, data.r);
    // if (response.responseCode) {
    //     for (let i = 0; i < data.r.length; i++) {
    //         if (data.r[i].checked) {
    //             fetchData(data.x, data.y, data.r[i].value);
    //         }
    //     }
    // } else {
    //     Toastify({
    //         text: response.message,
    //         className: "error",
    //         style: {
    //             background: "linear-gradient(to right, #10000b, #1012d)",
    //             border: "1px solid white"
    //         },
    //         offset: {
    //             x: 10,
    //             y: 60
    //         },
    //         position: "left",
    //     }).showToast();
    // }
});
