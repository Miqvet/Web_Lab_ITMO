package servlets;

import bean.Point;
import com.fasterxml.jackson.databind.ObjectMapper;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;


@WebServlet("/checker")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        DecimalFormat df = new DecimalFormat("#.###");
        ObjectMapper objectMapper = new ObjectMapper();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        try {

            BigDecimal x = new BigDecimal(request.getParameter("x").replace(",", "."));
            double y = Double.parseDouble(df.format(Double.parseDouble( request.getParameter("y"))).replace(",", "."));
            double r = Double.parseDouble( request.getParameter("r"));
            System.out.println(x);
            System.out.println(y);
            System.out.println(r);
            Point point = new Point(x, y, r, dtf.format(now).replace(" ", "\n"));
            System.out.println(point.isInArea());
            HttpSession session = request.getSession();

            LinkedList<Point> results = (LinkedList<Point>) session.getAttribute("results");
            if (results == null){
                results = new LinkedList<>();
                session.setAttribute("results", results);
            }
            results.add(0,point);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            String tableRes = point.isInArea() ? "Yea" : "Nope";
            HashMap<String, String> map = new HashMap<>();
            map.put("result", tableRes);
            map.put("x", String.valueOf(x));
            map.put("y", String.valueOf(y));
            map.put("r", String.valueOf(r));
            map.put("time", point.getTime());
            response.getWriter().write(objectMapper.writeValueAsString(map));
            response.setStatus(200);
            System.out.println(objectMapper.writeValueAsString(map));
        } catch (Exception e){
            System.out.println(e.getMessage());
            request.getRequestDispatcher("./index.jsp").forward(request, response);
        }
    }
}
