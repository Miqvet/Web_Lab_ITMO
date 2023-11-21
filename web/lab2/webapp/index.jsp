
<%@ page import="bean.Point" %>
<%@ page import="java.util.LinkedList" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="first test lab 1">
    <meta name="author" content="Liashenko Nikita Andreevich">
    <title>Web_LAb1_test</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
</head>

<body>

<div id="header">
    <h1>Web_Lab2 90832</h1>
    <hr class="line">
    <h2 >Liashenko Nikita group number P3209</h2>
</div>

<div id="sidebar">
    <% LinkedList<Point> results = (LinkedList<Point>) request.getSession().getAttribute("results"); %>
        <p id = "score">Score: 0</p>
    <div class="scroll-table">
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>X,Y,R</th>
                <th>Result</th>
            </tr>
            </thead>
        </table>
        <div class="scroll-table-body">
            <table id = "myTable" class="rainbow">
                <% if (results !=null){
                    for (Point point : results) {%>
                <tr>
                    <td class="<%= point.isInArea() ? "cell-in" : "cell-out"%>">
                        <%=  point.getTime()%>
                    </td>

                    <td class="<%= point.isInArea() ? "cell-in" : "cell-out"%>">
                        [<%=  point.getX()%>,<%=  point.getY()%>,<%=  point.getR()%>]
                    </td>

                    <td class="<%= point.isInArea() ? "result-in" : "result-out"%>">
                        <%= point.isInArea() ? "Yea" : "Nope"%>
                    </td>
                </tr>
                <% }} %>
            </table>
        </div>
    </div>
</div>
<div id="main">
    <canvas id="canvas" class="draw">Unsupported</canvas>
    <jsp:include page="inputForm.jsp" />
</div>
<div id="footer">Made with the support of ITMO and a lot of suffering</div>
</body>
<style>
    .line{
        padding: 2px;
        background-color: black;
        margin-left: 2%;
        margin-right: 2%;
        border-color: aliceblue;
    }
    .scroll-table-body {
        height: 300px;
        overflow-x: auto;
        margin-top: 0px;
        margin-bottom: 10px;
        border-bottom: 1px solid #000000;
    }
    .scroll-table table {
        width:100%;
        table-layout: fixed
    }
    .scroll-table thead th {
        font-weight: bold;
        padding: 10px 15px ;
        font-size: 14px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .scroll-table tbody td {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 10px 15px;

        font-size: 14px;
        vertical-align: top;
    }
    .result-in, .result-out {
        font-weight: bold;
        font-size: 17px;
        text-align: center;
    }

    .result-in{
        background-color: #67e567;
        animation: rainbow 2s linear infinite;
    }
    td.result-in, td.result-out{
        width: 45px;
    }

    .result-out{
        background-color: #e57373;
    }
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    @keyframes rainbow {
        0% {color: red;}
        14% {color: orange;}
        28% {color: yellow;}
        42% {color: green;}
        57% {color: blue;}
        71% {color: indigo;}
        85% {color: violet;}
        100% {color: red;}
    }
    .cell-in{
        text-align: left;
        animation: rainbow 3s linear infinite;
    }
    #myTable{
        font-weight: bold;
    }
    .invisible {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        display: inline;
    }
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .small {
        transform: scale(0.8);
    }
    button,
    input[type="text"] {
        border-width: 3px;
        border-style: solid;
        border-radius: 5px;
    }
    div{
        margin: 10px;
        border-radius: 7px;
        text-align: center;
        border: 1px solid black;
        font-size: 20px;
    }
    button.controlButton{
        width: 20%;
        min-width: 77px;
    }
    #header{
        font-style: italic;
        background-color: #b3c1c7;
        border-radius: 10px;
    }
    #sidebar{
        margin-top: 0px;
        background-color: #cfded2;
        float: right;
        height: 470px;
        width: 390px;
    }
    #main{
        background-color: rgba(159, 212, 218, 0.51);
        height: 470px;
        margin-right: 360px;
    }
    #footer{
        animation: rainbow 1s linear infinite;
        background-color: #c1c9da;
    }
    form:not(button){
        text-align: left;
        margin-left: 4%;
    }
    #reset{
        text-align: center ;
    }
    #score{
        animation: rainbow 3s linear infinite;
        margin: 10px;
        color: black;
        font-weight: bold;
    }
</style>
<script type="text/javascript" src="scripts/index.js"></script>
<script type="text/javascript" src="scripts/validator.js"></script>
<script type="text/javascript" src="scripts/table.js"></script>
<script type="text/javascript" src="scripts/someAnimation.js"></script>
<script type="text/javascript" src="scripts/init.js"></script>
<script type="text/javascript" src="scripts/drawing.js"></script>
<script type="text/javascript" src="scripts/clickCanvas.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</html>