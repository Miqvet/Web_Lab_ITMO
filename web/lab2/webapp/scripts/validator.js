function  validate(x, y, r){
    let response = {
        responseCode:  "",
        message: ""
    }
    let count_r = r.length;
    let count_y = y.length;

    if (!(!isNaN(x) && parseFloat(x) <= 3 && parseFloat(x) >= -3)){
        response.message = "Error in X. \n" +
            "X is between -5 and 5";
        response.responseCode = 0;
    }else if(count_r === 0 || count_y === 0){
        response.message = "You must choose one checkbox";
        response.responseCode = 0;
    } else{
        response.responseCode = 1;
    }
    return response;
}


function  validateCoordinates(x, y, r){
    if (!(!isNaN(x) && parseFloat(x) <= 3 && parseFloat(x) >= -3)){
        return false
    } else if (!([-4, -3, -2, -1, 0, 1, 2, 3, 4].includes(parseInt(y)) && !isNaN(y))){
        return false
    }else return [1, 2, 3, 4, 5].includes(parseInt(r)) && !isNaN(r);
}
