<?php

    date_default_timezone_set('Europe/Moscow');

    //запомнили время до выполнения
    //и читает переменные из запроса
    $start_time = microtime(true);
    $r = $_GET['r'];
    $x = $_GET['x'];
    $y = $_GET['y'];
    $response = [];

    //провека на присутсвие данных
     if ($_SERVER['REQUEST_METHOD'] === 'GET') {
         //провекра на вхождение в область
         if(validate($x,$y,$r)){
             if(
                 ($y + $x <= ($r / 2) && $x >= 0 && $y >= 0) ||
                 ($y ** 2 + $x ** 2 <= ($r / 2) ** 2 && $x <= 0 && $y >= 0) ||
                 ($y >= -$r && $x >= -$r && $x <= 0 && $y <= 0)
             ){
                 $response['result'] = "Входит";
                 http_response_code(200);
             } else {
                 $response['result'] = "Не входит";
                 http_response_code(200);
             }
         }else{
             $response['result'] = "Данные не валидны";
             http_response_code(400);
         }
         $end_time = microtime(true);
         $execution_time = ($end_time - $start_time);

         $response['curr_time'] = date('H:i:s');
         $response['exec_time'] = $execution_time;

         header('Content-Type: application/json; charset=utf-8');

         echo json_encode($response);

     }else{
         http_response_code(400);
     }
function validate($arg_x, $arg_y, $arg_r)
{
    if (
        ($arg_x <= 5 && $arg_x >= -5 && strlen($arg_x) <= 6) &&
        ($arg_y == -5 || $arg_y == -4 ||
                $arg_y == -3 || $arg_y == -2 || $arg_y == -1
                || $arg_y == 0 ||$arg_y == 1 || $arg_y == 2
                || $arg_y == 3) &&
        ($arg_r == 1 || $arg_r == 1.5 ||
                $arg_r == 2 || $arg_r == 2.5 || $arg_r == 3)
        && strlen($arg_r) <= 3
        && strlen($arg_y) <= 2
    ){
        return true;
    }else{
        return false;
    }
}
