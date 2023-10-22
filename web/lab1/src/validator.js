// TODO return bool
export function  validate(x, y, r){
    let response = {
        responseCode:  "",
        message: ""
    }
    let count_r = 0;

    //подсчёт отмеченных r
    for(let i = 0;i < r.length; i++){
        if(r[i].checked){
            count_r++;
        }
    }

    if (!(!isNaN(x) && parseFloat(x) <= 5 && parseFloat(x) >= -5)){
        response.message = "Error in X. \n" +
            "X is between -5 and 5";
        response.responseCode = 0;
    } else if (!([-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseInt(y)) && !isNaN(y))){
        response.message = "Error in Y. \n" +
            "You should use button.";
        response.responseCode = 0;
    }else if(count_r === 0){
        response.message = "You must choose one checkbox";
        response.responseCode = 0;
    } else{
        response.responseCode = 1;
    }
    return response;
}


export function  validateCoordinates(x, y, r){
    if (!(!isNaN(x) && parseFloat(x) <= 5 && parseFloat(x) >= -5)){
        return false
    } else if (!([-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseInt(y)) && !isNaN(y))){
        return false
    }else return [1, 1.5, 2, 2.5, 3].includes(parseInt(r)) && !isNaN(r);
}
