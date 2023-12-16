package model;
import jakarta.faces.context.FacesContext;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;
public class RBean implements Serializable {
    @Getter
    @Setter
    private double trueRVal = 0.0;
    private double rValue = 2.0;

    public double getRValue(){
        return rValue;
    }

    public void setRValue(double rValue){
        this.rValue = rValue;
    }
    public void setRValueByNow(){
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add("updateScore();");
        System.out.println();
        this.rValue = trueRVal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RBean rBean = (RBean) o;
        return Objects.equals(rValue, rBean.rValue);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rValue);
    }

    @Override
    public String toString() {
        return "RBean{" +
                "rValue=" + rValue +
                '}';
    }
}

