const myForm = document.getElementById('mainForm');
// Блок геттеров для получения данных из формы


function getX() {
    return document.getElementById('form_x').value.replace(",", ".");
}
function getYForm() {
    return document.querySelectorAll("input[class='y']:checked");
}

function getRForm() {
    return document.querySelectorAll("input[class='r']:checked");
}

// Функция отправки данных на сервер
function fetchData(x, y, r, graph) {
    fetch(`controller`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            x: x,
            y: y,
            r: r,
            graph: graph,
        }).toString()
    }).then(
        response => {
            return response.text();
        }
    ).then(result => {
        let responseData = JSON.parse(result);
        console.log(responseData.x, responseData.y, responseData.r, responseData.result)
        addToTable(responseData.x, responseData.y, responseData.r, responseData.result, responseData.time);
    }).catch(error => {
            showToast(`There was an error processing your request: ${error.message}`);
        })
}


// Добавляем обработчик события отправки формы
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        x: getX(),
        y: getYForm(),
        r: getRForm()
    }
    let validateFlag = false;
    for (let i = 0; i < data.r.length; i++) {
        for(let j = 0; j < data.y.length; j++){
            if (validateCoordinates(data.x,data.y[j].value,data.r[i].value)){
                console.log(data.x, data.y[j].value, data.r[i].value);
                fetchData(data.x, data.y[j].value, data.r[i].value, false);
            }else if (!validateFlag){
                showToast("ошибка валидации");
                validateFlag = true;
            }
        }
    }
});
function showToast(message, className = "info") {
    Toastify({
        text: message,
        className: className,
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
}