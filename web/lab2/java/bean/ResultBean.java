package bean;


import java.io.Serializable;
import java.util.ArrayList;

public class ResultBean implements Serializable {

    private ArrayList<Point> results;

    public ResultBean(){
        results = new ArrayList<>();
    }

    public ArrayList<Point> getResults(){
        return results;
    }

    public void addResults(Point point){
        this.results.add(point);
        System.out.println(results.size());
    }
    public void clearData(){
        results.clear();
    }
}