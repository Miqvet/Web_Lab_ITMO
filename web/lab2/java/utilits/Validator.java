package utilits;

import java.util.Arrays;
import java.util.List;


public class Validator {
    public static boolean checkXYR(double x, double y, double r){
        return checkX(x) && checkY(y) && checkR(r);
    }
    public static boolean checkXYRCanvas(double x, double y, double r){
        return ( -6 <= x && x <= 6 ) && ( -6<= y && y <=6 ) && checkR(r);
    }
    private static boolean checkX(double x) {
        return ( -3 <= x && x <= 3 );
    }
    private static boolean checkY(double y) {
        List<? extends Number> valuesY = Arrays.asList(-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0);
        return valuesY.contains(y);
    }
    private static boolean checkR(double r) {
        List<? extends Number> valuesR = Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0);
        return valuesR.contains(r);
    }
}
