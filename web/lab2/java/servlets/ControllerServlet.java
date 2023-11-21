package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static utilits.Validator.checkXYR;
import static utilits.Validator.checkXYRCanvas;


@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        final String INVALID_DATA= "Incorrect data";
        String xValue = request.getParameter("x");
        String yValue = request.getParameter("y");
        String rValue = request.getParameter("r");
        boolean isGraph = Objects.equals(request.getParameter("graph"), "true");

        System.out.println(xValue + " " + yValue + " "+ rValue + " " + isGraph + " Server");

        try {
            if (xValue == null || yValue == null || rValue == null){
                throwError(response, INVALID_DATA);
                return;
            }
            if (!isGraph){
                if (!checkXYR(Double.parseDouble(xValue), Double.parseDouble(yValue), Double.parseDouble(rValue))){
                    throwError(response, INVALID_DATA);
                    return;
                }
                request.getRequestDispatcher("./checker").forward(request, response);
            }
            if(!checkXYRCanvas(Double.parseDouble(xValue), Double.parseDouble(yValue), Double.parseDouble(rValue))){
                System.out.println("Валидация провалена");
                throwError(response, INVALID_DATA);
                return;
            }
            System.out.println("Валидация пройдена");
            request.getRequestDispatcher("./checker").forward(request, response);
        } catch (Exception e){
            throwError(response, e.toString());
        }
    }
    private void throwError(HttpServletResponse response,  String errorMsg) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonResponse = new HashMap<>() {{
            put("error", errorMsg);
            put("status", "UNPROCESSABLE_ENTITY");
        }};
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
        response.setStatus(400);
    }
}

