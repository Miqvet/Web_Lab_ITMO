package bean;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

public class Point {
    private final BigDecimal x;
    private final double y;
    private final double r;
    private final String  time;


    private final boolean inArea;

    private boolean circle(BigDecimal  x, double y, double r){
        BigDecimal xSquare = x.pow(2);
        BigDecimal ySquare = BigDecimal.valueOf(y).pow(2);
        BigDecimal radius = BigDecimal.valueOf(r/2).pow(2);
        System.out.println("aaaaaaaaaaaaaaaaaaaaaa");
        System.out.println((xSquare.add(ySquare).compareTo(radius) <= 0));
        return (xSquare.add(ySquare).compareTo(radius) <= 0);
    }

    private boolean triangle(BigDecimal x, double y, double r){
        BigDecimal xHalf = x.divide(BigDecimal.valueOf(2));
        BigDecimal yValue = BigDecimal.valueOf(y);
        BigDecimal radius = BigDecimal.valueOf(r).divide(BigDecimal.valueOf(2)).negate();

        return yValue.compareTo(radius.subtract(xHalf)) >= 0;
    }

    private boolean rectangle(BigDecimal x, double y, double r){
        return (x.compareTo(BigDecimal.valueOf(-r)) >= 0  && y <= r);
    }


    public Point(BigDecimal x, double y, double r,  String time){
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = inArea(x, y, r);
        this.time = time;
    }

    private boolean inArea(BigDecimal x, double y, double r){
        if (x.compareTo(new BigDecimal(0)) > 0 && y > 0){
            return false;
        }

        if (x.compareTo(new BigDecimal(0)) <= 0 && y >= 0){
            return rectangle(x, y, r);
        }

        if (x.compareTo(new BigDecimal(0)) <= 0){
            return triangle(x, y, r);
        }
        return circle(x, y, r);
    }

    public BigDecimal getX(){
        return x;
    }

    public double getY(){
        return y;
    }

    public double getR(){
        return r;
    }
    public String getTime(){
        return time;
    }

    public boolean isInArea(){
        return inArea;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Point.class != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && Double.compare(y, point.y) == 0 && r == point.r;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r);
    }

    @Override
    public String toString() {
        return "models.Point{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isInArea=" + inArea +
                '}';
    }
}