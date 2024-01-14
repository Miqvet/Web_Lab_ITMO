package com.example.backend.service;

import com.example.backend.model.DataRequest;
import org.springframework.stereotype.Service;

@Service
public class AreaCheckService {
    public String isPointInsideArea(DataRequest data){
        double x = data.getX();
        double y = data.getY();
        double r = data.getR();
        if (hitCircle(x,y,r) || hitSquare(x,y,r) || hitTriangle(x,y,r)){
            return "In";
        }else{
            return "Out";
        }
    }
    public boolean hitSquare(double x, double y, double r) {
        return (x >= -r && y >= -r) && (x <= 0 && y <= 0);
    }
    public boolean hitCircle(double x, double y, double r) {
        return (x * x + y * y <= r * r) && (x >= 0 && y >= 0);
    }
    public boolean hitTriangle(double x, double y, double r) {
        return (y >= x / 2 - r / 2) && (x >= 0 && y <= 0);
    }
}
