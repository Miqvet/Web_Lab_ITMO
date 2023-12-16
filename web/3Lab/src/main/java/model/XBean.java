package model;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;
public class XBean implements Serializable {

    public String getButtonCssClass(double button) {
        if (button == xValue) {
            return "small-btn";
        } else {
            return "xButton";
        }
    }

    private Double xValue = 0.0;
    @Getter
    @Setter
    private Double XByBtn = 0.0;
    public Double getXValue(){
        return xValue;
    }

    public void setXValue(Double value){
        this.xValue = value;
    }
    public void sXByBtn(){
        System.out.println(XByBtn);
        System.out.println(xValue);
        this.xValue = XByBtn;
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;

        if (!(o instanceof XBean)) return false;

        XBean that = (XBean) o;
        return Double.compare(getXValue(), that.getXValue()) == 0;
    }

    @Override
    public int hashCode(){
        return Objects.hash(getXValue());
    }

    @Override
    public String toString(){
        return "XBean{" +
                "value" + xValue +
                "}";
    }
}
