/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRForm: () => (/* binding */ getRForm),\n/* harmony export */   getX: () => (/* binding */ getX),\n/* harmony export */   getY: () => (/* binding */ getY)\n/* harmony export */ });\n/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ \"./src/table.js\");\n/* harmony import */ var _validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validator */ \"./src/validator.js\");\n\r\n\r\nconst myForm = document.getElementById('mainForm');\r\nconst today = new Date();\r\n// Блок геттеров для получения данных из формы\r\n\r\n// TODO camelCase\r\nfunction getX() {\r\n    return document.getElementById('form_x').value;\r\n}\r\n\r\nfunction getY() {\r\n    return document.getElementById('form_y').value;\r\n}\r\n\r\nfunction getRForm() {\r\n    return document.getElementsByClassName('r');\r\n}\r\n\r\n// Функция отправки данных на сервер\r\nfunction fetchData(x, y, r) {\r\n    // TODO template string\r\n    const url = `form.php?x=${x}&y=${y}&r=${r}`; // Замените URL на ваш API URL\r\n    fetch(url, {\r\n        method: 'GET',\r\n    }).then(\r\n        response => {\r\n            return response.text();\r\n        }\r\n    ).then(result => {\r\n        let responseData = JSON.parse(result);\r\n        (0,_table__WEBPACK_IMPORTED_MODULE_0__.saveTable)(x, y, r, responseData.result, today.toLocaleString(), responseData.exec_time);\r\n        (0,_table__WEBPACK_IMPORTED_MODULE_0__.addToTable)(x, y, r, responseData.result, today.toLocaleString(), responseData.exec_time);\r\n    })\r\n        .catch(error => {\r\n            // красивые алерты\r\n            Toastify({\r\n                text: `There was an error processing your request: ${error.message}`,\r\n                className: \"error\",\r\n                style: {\r\n                    background: \"linear-gradient(to right, #ff00b, #ff12d)\",\r\n                    border: \"1px solid white\"\r\n                },\r\n                offset: {\r\n                    x: 10,\r\n                    y: 60\r\n                },\r\n                position: \"left\",\r\n            }).showToast();\r\n        })\r\n}\r\n\r\n\r\n// Добавляем обработчик события отправки формы\r\nmyForm.addEventListener('submit', function (e) {\r\n    e.preventDefault();\r\n    let data = {\r\n        x: getX(),\r\n        y: getY(),\r\n        r: getRForm()\r\n    }\r\n    let validateFlag = false;\r\n    for (let i = 0; i < data.r.length; i++) {\r\n        if (data.r[i].checked) {\r\n            if ((0,_validator__WEBPACK_IMPORTED_MODULE_1__.validateCoordinates)(data.x,data.y,data.r[i].value)){\r\n                fetchData(data.x, data.y, data.r[i].value);\r\n            }else if (!validateFlag){\r\n                Toastify({\r\n                    text: 'Ошибка валидации',\r\n                    className: \"error\",\r\n                    style: {\r\n                        background: \"linear-gradient(to right, #10000b, #1012d)\",\r\n                        border: \"1px solid white\"\r\n                    },\r\n                    offset: {\r\n                        x: 10,\r\n                        y: 60\r\n                    },\r\n                    position: \"left\",\r\n                }).showToast();\r\n                validateFlag = true;\r\n            }\r\n        }\r\n    }\r\n\r\n    //let response = validate(data.x, data.y, data.r);\r\n    // if (response.responseCode) {\r\n    //     for (let i = 0; i < data.r.length; i++) {\r\n    //         if (data.r[i].checked) {\r\n    //             fetchData(data.x, data.y, data.r[i].value);\r\n    //         }\r\n    //     }\r\n    // } else {\r\n    //     Toastify({\r\n    //         text: response.message,\r\n    //         className: \"error\",\r\n    //         style: {\r\n    //             background: \"linear-gradient(to right, #10000b, #1012d)\",\r\n    //             border: \"1px solid white\"\r\n    //         },\r\n    //         offset: {\r\n    //             x: 10,\r\n    //             y: 60\r\n    //         },\r\n    //         position: \"left\",\r\n    //     }).showToast();\r\n    // }\r\n});\r\n\n\n//# sourceURL=webpack://web/./src/index.js?");

/***/ }),

/***/ "./src/reloadWindowSaveData.js":
/*!*************************************!*\
  !*** ./src/reloadWindowSaveData.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table */ \"./src/table.js\");\n/* harmony import */ var _someAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./someAnimation */ \"./src/someAnimation.js\");\n\r\n\r\n\r\nwindow.addEventListener(\"load\",() => {\r\n    (0,_table__WEBPACK_IMPORTED_MODULE_1__.loadTable)();\r\n    loadForm();\r\n});\r\nwindow.addEventListener(\"beforeunload\",() => {\r\n    saveValue()\r\n});\r\n\r\nconst xField = document.getElementById(\"form_x\");\r\nconst yField = document.getElementById('form_y');\r\nconst yButtons = document.getElementsByClassName('y');\r\nconst rFields = (0,_index__WEBPACK_IMPORTED_MODULE_0__.getRForm)();\r\nlet checkedRFields;\r\nlet counterOfR;\r\nlet rValues;\r\n\r\nfunction saveValue() {\r\n    // сохранение x\r\n    localStorage.setItem(\"xField\", (0,_index__WEBPACK_IMPORTED_MODULE_0__.getX)());\r\n\r\n    //сохранение y\r\n    localStorage.setItem(\"yField\", (0,_index__WEBPACK_IMPORTED_MODULE_0__.getY)());\r\n\r\n    //сохранение r\r\n    counterOfR = 0;\r\n    rValues = [];\r\n    for(let i = 0; i < rFields.length; i++){\r\n        if(rFields[i].checked){\r\n            rValues[counterOfR++] = rFields[i].value;\r\n        }\r\n    }\r\n    localStorage.setItem(\"rField\", JSON.stringify(rValues));\r\n}\r\n// загрузка данных из формаъ\r\nfunction loadForm() {\r\n    // загрузка x\r\n    if (localStorage.getItem(\"xField\") !== null) {\r\n        xField.value = localStorage.getItem(\"xField\");\r\n    }\r\n    // загрузка y\r\n    if (localStorage.getItem(\"yField\") !== null) {\r\n        yField.value = localStorage.getItem(\"yField\");\r\n        for(let i = 0; i < yButtons.length; i ++){\r\n            if(yButtons[i].value === yField.value){\r\n                yButtons[i].classList.add(\"small\")\r\n                ;(0,_someAnimation__WEBPACK_IMPORTED_MODULE_2__.setLastClickedButton)(yButtons[i]);\r\n            }\r\n        }\r\n    }\r\n\r\n    //загрузка r\r\n    checkedRFields = JSON.parse(localStorage.getItem(\"rField\"));\r\n    if (checkedRFields !== null) {\r\n        for(let i = 0; i < rFields.length; i ++){\r\n            for(let j = 0; j < checkedRFields.length; j ++){\r\n                if(rFields[i].value === checkedRFields[j]){\r\n                    rFields[i].checked = true;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://web/./src/reloadWindowSaveData.js?");

/***/ }),

/***/ "./src/someAnimation.js":
/*!******************************!*\
  !*** ./src/someAnimation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setLastClickedButton: () => (/* binding */ setLastClickedButton),\n/* harmony export */   updateScore: () => (/* binding */ updateScore)\n/* harmony export */ });\nconst buttonsY = document.getElementsByClassName(\"y\");\r\nlet lastClickedButton = null;\r\nconst buttonReset = document.getElementById(\"reset\")\r\n// Начало модуля для работы с анимацией последней нажатой кнопкой\r\nfunction setLastClickedButton(e){\r\n    lastClickedButton = e;\r\n}\r\n\r\nbuttonReset.addEventListener(\"click\", function(){\r\n    if(lastClickedButton !== null){\r\n        lastClickedButton.classList.remove(\"small\");\r\n    }\r\n});\r\n\r\nfor (let i = 0; i < buttonsY.length; i++) {\r\n    buttonsY[i].addEventListener(\"click\", function() {\r\n        if (lastClickedButton !== this){\r\n            if (lastClickedButton !== null) {\r\n                lastClickedButton.classList.remove(\"small\");\r\n            }\r\n            if (this !== lastClickedButton) {\r\n                this.classList.add(\"small\");\r\n            }\r\n        }\r\n\r\n        lastClickedButton = this;\r\n        document.querySelector('input[name=\"y\"]').value = this.value;\r\n    });\r\n}\r\n// анимация счётчика\r\nfunction updateScore(){\r\n    let score_counter = document.getElementsByClassName(\"result-in\").length;\r\n    let score = document.getElementById(\"score\");\r\n    score.innerHTML = \"Score: \" + score_counter;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://web/./src/someAnimation.js?");

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToTable: () => (/* binding */ addToTable),\n/* harmony export */   loadTable: () => (/* binding */ loadTable),\n/* harmony export */   saveTable: () => (/* binding */ saveTable)\n/* harmony export */ });\n/* harmony import */ var _someAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./someAnimation */ \"./src/someAnimation.js\");\n\r\n\r\nconst clearButton = document.getElementById(\"clearTable\");\r\n// добавление результата в таблицу\r\nfunction addToTable(x, y, r, result, curr_time, exec_time) {\r\n\r\n    let table = document.getElementById('myTable');\r\n    let row = table.insertRow(-1);\r\n    let className=\"cell-out\";\r\n\r\n    const cell1 = row.insertCell(0);\r\n    const cell2 = row.insertCell(1);\r\n    const cell3 = row.insertCell(2);\r\n\r\n    if (result === 'Входит'){\r\n        className = \"cell-in\";\r\n    }\r\n    cell1.textContent = \"You at: \" + curr_time +\" for \" + exec_time.toFixed(6);\r\n    cell1.className = className;\r\n\r\n\r\n    cell2.textContent = \"[\"+x+\";\"+y+\";\"+r+\"]\";\r\n    cell2.className = className;\r\n\r\n    cell3.textContent = result;\r\n    if (result === 'Входит'){\r\n        cell3.className = \"result-in\"\r\n    } else{\r\n        cell3.className = \"result-out\";\r\n    }\r\n\r\n    (0,_someAnimation__WEBPACK_IMPORTED_MODULE_0__.updateScore)();\r\n}\r\nfunction saveTable(x, y, r, result, curr_time, exec_time){\r\n    let currData = JSON.parse(localStorage.getItem(\"tableData\")) || [];\r\n\r\n    currData.push({x, y, r, result, curr_time, exec_time});\r\n    localStorage.setItem('tableData', JSON.stringify(currData));\r\n}\r\nfunction loadTable(){\r\n    let savedData = JSON.parse(localStorage.getItem('tableData')) || [];\r\n\r\n    savedData.forEach(data => {\r\n        addToTable(data.x, data.y, data.r, data.result, data.curr_time, data.exec_time);\r\n    })\r\n}\r\n\r\nclearButton.addEventListener(\"click\", () => {\r\n    localStorage.clear();\r\n    location.reload();\r\n});\n\n//# sourceURL=webpack://web/./src/table.js?");

/***/ }),

/***/ "./src/validator.js":
/*!**************************!*\
  !*** ./src/validator.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validate: () => (/* binding */ validate),\n/* harmony export */   validateCoordinates: () => (/* binding */ validateCoordinates)\n/* harmony export */ });\n// TODO return bool\r\nfunction  validate(x, y, r){\r\n    let response = {\r\n        responseCode:  \"\",\r\n        message: \"\"\r\n    }\r\n    let count_r = 0;\r\n\r\n    //подсчёт отмеченных r\r\n    for(let i = 0;i < r.length; i++){\r\n        if(r[i].checked){\r\n            count_r++;\r\n        }\r\n    }\r\n\r\n    if (!(!isNaN(x) && parseFloat(x) <= 5 && parseFloat(x) >= -5)){\r\n        response.message = \"Error in X. \\n\" +\r\n            \"X is between -5 and 5\";\r\n        response.responseCode = 0;\r\n    } else if (!([-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseInt(y)) && !isNaN(y))){\r\n        response.message = \"Error in Y. \\n\" +\r\n            \"You should use button.\";\r\n        response.responseCode = 0;\r\n    }else if(count_r === 0){\r\n        response.message = \"You must choose one checkbox\";\r\n        response.responseCode = 0;\r\n    } else{\r\n        response.responseCode = 1;\r\n    }\r\n    return response;\r\n}\r\n\r\n\r\nfunction  validateCoordinates(x, y, r){\r\n    if (!(!isNaN(x) && parseFloat(x) <= 5 && parseFloat(x) >= -5)){\r\n        return false\r\n    } else if (!([-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseInt(y)) && !isNaN(y))){\r\n        return false\r\n    }else if(!([1, 1.5, 2, 2.5, 3].includes(parseInt(r)) && !isNaN(r))){\r\n        return false\r\n    } else {\r\n        return true\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web/./src/validator.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/reloadWindowSaveData.js");
/******/ 	
/******/ })()
;