function drawPoint(xVal, yVal, color){
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');

    const pointSize = 10;
    ctx.beginPath();
    ctx.arc(xVal, yVal, pointSize/2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

}
function drawPoints(valueR){
    valueR += '.0'
    let table = document.getElementById('myTable');
    let rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let xV = JSON.parse(cells[1].innerText)[0]
        let yV = JSON.parse(cells[1].innerText)[1]
        let rV = JSON.parse(cells[1].innerText)[2] + '.0'
        if( rV === valueR ){
            let data = toCanvasCoords(xV, yV, rV.replace(",", "."), 230);
            console.log(data.x, data.y, cells[2].innerText === 'Yea' ? "rgb(39,252,1)" : 'rgb(255,0,0)');
            drawPoint( data.x, data.y, cells[2].innerText === 'Yea' ? "rgb(39,252,1)" : 'rgb(255,0,0)');
          }else {
            console.log(JSON.parse(cells[1].innerText)[2], valueR)
            console.log(valueR, cells[0].innerText, cells[1].innerText, 'aaaaaa')
        }
    }
}
function drawCoordsPlane( valueR = 'r'){
    let halfR;
    if(valueR === 'r'){
        halfR = 'r/2';
    }else{
        halfR = valueR / 2;
    }
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = 230;
    canvas.height = 230;

    const indent = 17;
    const textIndent = 7;
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    const r = canvas.width / 2 - indent;
    const arrowSize = 5;




    // Стрелочки для осей
    ctx.moveTo(canvas.width - arrowSize, halfHeight - arrowSize);
    ctx.lineTo(canvas.width - 1, halfHeight);
    ctx.lineTo(canvas.width - arrowSize, halfHeight + arrowSize);

    ctx.moveTo(halfWidth - arrowSize, arrowSize);
    ctx.lineTo(halfWidth, 1);
    ctx.lineTo(halfWidth + arrowSize, arrowSize);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();
    ctx.stroke();

    ctx.fillStyle = 'rgba(65,105,225,0.5)';
    //3rd quarter - square
    ctx.fillRect(indent , indent, r, r);

    //4th quarter - 1/4 circle
    ctx.beginPath();
    ctx.arc(halfWidth, halfHeight, r/2, 0, 1/2*Math.PI);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.fill();

    //1st quarter - triangle
    ctx.beginPath();
    ctx.moveTo(halfWidth, halfHeight + r/2);
    ctx.lineTo(indent, halfHeight);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.beginPath();
    ctx.font = "14px Arial";
    ctx.fillText('y', halfWidth + textIndent, textIndent);
    ctx.fillText('x', canvas.width - textIndent, halfHeight - textIndent);

    ctx.fillText('' +halfR, halfWidth + textIndent, halfHeight-r/2  + textIndent/2);
    ctx.moveTo(halfWidth - 4, halfHeight-r/2 );
    ctx.lineTo(halfWidth  + 4, halfHeight-r/2);
    ctx.fillText(''+valueR, halfWidth + textIndent, halfHeight - r + textIndent /2);
    ctx.moveTo(halfWidth - 4 , halfHeight - r);
    ctx.lineTo(halfWidth + 4, halfHeight - r );

    ctx.fillText(halfR + "", halfWidth + r/2 - textIndent, halfHeight-textIndent);
    ctx.moveTo(halfWidth  + r / 2 , halfHeight - 4);
    ctx.lineTo(halfWidth + r/ 2, halfHeight + 4);
    ctx.fillText(valueR+ "", halfWidth + r - textIndent/2 + 3, halfHeight-textIndent);
    ctx.moveTo(halfWidth  +r , halfHeight - 4);
    ctx.lineTo(halfWidth + r, halfHeight + 4);

    ctx.fillText("-"+halfR,  halfWidth - r/2 - textIndent, halfHeight - textIndent);
    ctx.moveTo(halfWidth - r/2, halfHeight - 4);
    ctx.lineTo(halfWidth - r/2, halfHeight  +4);
    ctx.fillText("-"+valueR, indent - textIndent / 2, halfHeight-textIndent);
    ctx.moveTo(halfWidth - r, halfHeight  - 4);
    ctx.lineTo(halfWidth - r, halfHeight  + 4);

    ctx.fillText("-"+valueR, halfWidth + textIndent, halfHeight + r + textIndent / 2);
    ctx.moveTo(halfWidth - 4, halfHeight + r);
    ctx.lineTo(halfWidth + 4, halfHeight  + r);
    ctx.fillText("-"+halfR, halfWidth + textIndent, halfHeight + r/2  + textIndent / 2);
    ctx.moveTo(halfWidth - 4 , halfHeight + r/2);
    ctx.lineTo(halfWidth + 4, halfHeight +r/2 );
    ctx.stroke();
    // оси
    ctx.fillStyle = 'rgba(0,0,0)';
    ctx.beginPath();
    ctx.moveTo(0, halfHeight);
    ctx.lineTo(canvas.width, halfHeight);
    ctx.moveTo(halfWidth, 0);
    ctx.lineTo(halfWidth, canvas.height);

    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();
    ctx.stroke();

    drawPoints(valueR);
}

function toCanvasCoords(x, y, r, canvasSize) {
    canvasSize -= 34;
    const scale = canvasSize / 2;
    console.log(x,y,r)
    console.log(scale / r * x + scale + 17,canvasSize - (scale / r * y + scale) + 17)
    return {
        x: scale / r * x + scale + 17,
        y: canvasSize - (scale / r * y + scale) + 17
    };
}

function toNormalCoords(canvasX, canvasY, r, canvasSize){
    canvasY -= 17;
    canvasX -= 17;
    canvasSize -= 34;
    const scale = canvasSize / 2;
    return {
        x: r * (canvasX - scale) / scale,
        y: r * (canvasSize - canvasY - scale) / scale
    }
}