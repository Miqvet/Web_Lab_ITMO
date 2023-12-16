
package model;
import java.util.Objects;

public class Point {
    private double x;
    private double y;
    private double r;

    private boolean result;
    private String  time;

    public Point(){
        super();
    }


    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point that = (Point) o;
        return Double.compare(x, that.x) == 0 && Double.compare(y, that.y) == 0 && Double.compare(r, that.r) == 0 && result == that.result;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r, result);
    }

    @Override
    public String toString() {
        return "ResultControllerBean{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                '}';
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }
}

