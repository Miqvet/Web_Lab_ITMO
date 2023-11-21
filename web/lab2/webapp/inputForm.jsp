<%--
  Created by IntelliJ IDEA.
  User: nik31
  Date: 17.10.2023
  Time: 22:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form id = "mainForm">

    <br/>
    <b>X [-3;3]:</b>
    <input name="x"
           id="form_x"
           type="text"
           placeholder="from -3.0 to 3.0"
           pattern="(?:-3|\+?3)(?:[.,]0+)?|(?:-[210]|\+?[012])(?:[.,]\d+)?"
           required>

    <br/>
    <br/>

    <b>Y:</b>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="-4">
        -4
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="-3">
        -3
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="-2">
        -2
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="-1">
        -1
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="0">
        0
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="1">
        1
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="2">
        2
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="3">
        3
    </label>
    <label>
        <input type="checkbox" class = "y" name = "form_y" value="4">
        4
    </label>

    <br/>
    <br/>
    <b>R:</b>
    <label>
        <input type="checkbox" class = "r" name = "form_r" value="1">
        1
    </label>
    <label>
        <input type="checkbox" class = "r" name = "form_r" value="2">
        2
    </label>
    <label>
        <input type="checkbox" class = "r" name = "form_r" value="3">
        3
    </label>
    <label>
        <input type="checkbox" class = "r" name = "form_r" value="4">
        4
    </label>
    <label>
        <input type="checkbox" class = "r" name = "form_r" value="5">
        5
    </label>
    <br><br>
    <button id = "reset" type="reset" class="controlButton">Reset</button>
    <button type="submit" class="controlButton">Push</button>
    <button type="button" class="controlButton" id = "clearTable">UpdateTable</button>
</form>
</body>
</html>
