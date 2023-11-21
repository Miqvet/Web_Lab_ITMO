const canvas = document.getElementById('canvas')
canvas.addEventListener('click', function (event){
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const chosenCheckboxes = document.querySelectorAll("input[class='r']:checked");
    const rVal = Array.from(chosenCheckboxes).map(checkbox => checkbox.value).at(-1);

    const normalCoords = toNormalCoords(x, y, rVal, 230);
    if (rVal !== undefined){
        fetchData(normalCoords.x, normalCoords.y, rVal, true);
    } else {
        Toastify({
            text: "You must have chosen R range",
            className: "error",
            style: {
                background: "linear-gradient(to right, #ff6347, #ff0000)",
                border: "1px solid white",
                'font-size': "20px"
            },
            offset: {
                x: 0,
                y: 0
            },
            position: "left",
        }).showToast();
    }
})