

import jakarta.faces.component.FacesComponent;
import jakarta.faces.component.UIComponentBase;
import jakarta.faces.component.UIInput;

@FacesComponent("kitten")
public class CustomComponent extends UIComponentBase {
    private static final String IS_ANGRY_ATTRIBUTE = "isAngry";

    @Override
    public String getFamily() {
        return "kitten";
    }
    public CustomComponent() {
        setRendererType("kitten");
    }
    public boolean isCatAngry() {
        return (Boolean) getStateHelper().eval(IS_ANGRY_ATTRIBUTE, false);
    }
    public void setAngryCat(boolean isAngry) {
        getStateHelper().put(IS_ANGRY_ATTRIBUTE, isAngry);
    }
    public double getChance() {
        return (Double) getStateHelper().eval("chance", 1);
    }

    public void setChance(int chance) {
        getStateHelper().put("chance", chance);
    }
}