package model;


import dataBase.ResultDAOImpl;
import dataBase.ResultEntity;
import jakarta.annotation.PostConstruct;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import lombok.Getter;
import lombok.Setter;

import java.awt.desktop.SystemEventListener;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Locale;
import java.util.Objects;


public class ResultsControllerBean implements Serializable {
    private ResultDAOImpl resultDAO = new ResultDAOImpl();
    @Inject
    private RBean rBean; // данные бины необходимы для контроля фронта
    @Inject
    private YBean yBean;
    @Inject
    private XBean xBean;

    private double sortedByR = 0.0;
    private double maybeSortedByR = 0.0;

    public void setMaybeSortedByR(final double sortedByR){
        this.maybeSortedByR=sortedByR;
    }
    public double getMaybeSortedByR(){
        return maybeSortedByR;
    }


    public void setSortedByR(final double sortedByR){
        this.sortedByR =sortedByR;
    }
    public double getSortedByR(){
        return sortedByR;
    }
    public void sSortedByR1(){
        System.out.println(sortedByR);
        System.out.println(maybeSortedByR);
        this.sortedByR = maybeSortedByR;
    }

    public ArrayList<ResultEntity> getResults(){
       ArrayList<ResultEntity> buffer = new ArrayList<>(results);
        if (sortedByR>=0 && sortedByR <2) {
            return results;
        }
        buffer.removeIf(point -> point.getR() != sortedByR);
        return buffer;
    }

    private ArrayList<ResultEntity> results = new ArrayList<>();

    @PostConstruct
    public void init() {
        var resultsEntities = resultDAO.getAllResults();
        results = new ArrayList<>(resultsEntities);
        System.out.println("Results initialized with {} entries.");
        System.out.println(results.size());
    }

    public void addResult(Double x, Double y, Double r) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        boolean result = AreaChecker.isInArea(x, y, r);

        ResultEntity en = ResultEntity.builder().x(x).y(y).r(r).result(result).time(dtf.format(now).replace(" ", "\n")).build();

        results.add(en);
        resultDAO.addNewResult(en);

        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add("drawCoordsPlane("+ r + ");");
        System.out.println(results.size());
        System.out.println(results.toString());
    }
    public void clearResults(){
        results.clear();
        resultDAO.clearResults();
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add("updateScore();");
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ResultsControllerBean that = (ResultsControllerBean) o;
        return Objects.equals(xBean, that.xBean) && Objects.equals(yBean, that.yBean) && Objects.equals(rBean, that.rBean) && Objects.equals(results, that.results);
    }

    @Override
    public int hashCode() {
        return Objects.hash(xBean, yBean, rBean, results);
    }

    @Override
    public String toString() {
        return "ResultsControllerBean{" +
            "xBean=" + xBean.toString() +
                    ", yBean=" + yBean.toString() +
                    ", rBean=" + rBean.toString() +
                    ", results=" + results +
                    '}';
        }

}
