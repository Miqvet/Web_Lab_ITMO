
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@Named
@SessionScoped
public class CustomTagBean  implements Serializable {
    private boolean catAngry = true;
    private double chance = 1;


    public void setCatAngry(boolean angry) {
        catAngry = angry;
    }

    public boolean getCatAngry() {
        return catAngry;
    }

    public void setChance(double chance) {
        this.chance = chance;
    }

    public double getChance() {
        return chance;
    }
    public void submit() {
        System.out.println("Cat is angry: " + catAngry);
        System.out.println("Chance: " + chance);
    }
}
