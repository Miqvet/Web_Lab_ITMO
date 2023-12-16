import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.faces.context.FacesContext;
import jakarta.faces.context.ResponseWriter;
import jakarta.faces.render.FacesRenderer;
import jakarta.faces.render.Renderer;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@FacesRenderer(componentFamily = "kitten", rendererType = "kitten")
public class CustomTagRenderer extends Renderer<CustomComponent> {
    private static final String GIPHY_API_KEY = "Jazc0FfeFNR3GywuSH80iW8Nye8Our1T";

    @Override
    public boolean getRendersChildren() {
        return true;
    }

    @Override
    public void encodeBegin(FacesContext context, CustomComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        writer.startElement("div", component);
        writer.writeAttribute("id", component.getId(), null);
    }

    @Override
    public void encodeChildren(FacesContext context, CustomComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        StringWriter output = new StringWriter();
        context.setResponseWriter(writer.cloneWithWriter(output));
        try {
            super.encodeChildren(context, component);
        } finally {
            context.setResponseWriter(writer);
        }
        String content = output.toString();
        String searchTag = component.isCatAngry() ? "AngryCat" : "SleepCat";
        System.out.println(component.isCatAngry());
        System.out.println(component.getChance());
        System.out.println(111111);
        System.out.println(222222);
        Matcher matcher = Pattern.compile("\\bkitten\\b", Pattern.CASE_INSENSITIVE).matcher(content);
        if(Math.random() < component.getChance()){
            content = matcher.replaceAll("<img height=30 src=\"" + getRandomUrl(searchTag) +"\">");
        }else{
            content = matcher.replaceAll("<img height=30 src=\"" + getRandomUrl("SleepCat") +"\">");
        }
        writer.write(content);
    }

    @Override
    public void encodeEnd(FacesContext context, CustomComponent component) throws IOException {
        context.getResponseWriter().endElement("div");
        context.getResponseWriter().endElement("form");
    }
//    @Override
//    public void decode(FacesContext context, CustomComponent component) {
//        Map<String, String> params = context.getExternalContext().getRequestParameterMap();
//        String clientId = component.getClientId(context);
//        System.out.println("aaaaaaaaaa");
//        if (params.containsKey(clientId)) {
//            String value = params.get(clientId);
//            boolean showDucks = value.equals("true");
            //component.setAngryCat(showDucks);
//        }
//    }
    private String getRandomUrl(String tag) throws IOException {
        HttpClient httpClient = HttpClients.createDefault();

        // Создание HTTP GET запроса к Giphy API
        String url = "https://api.giphy.com/v1/gifs/random?api_key=" + GIPHY_API_KEY + "&tag=" + tag;
        HttpGet request = new HttpGet(url);
        HttpResponse response = httpClient.execute(request);
        HttpEntity entity = response.getEntity();
        String responseJson = EntityUtils.toString(entity);

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(responseJson, JsonObject.class);
        return jsonObject.getAsJsonObject("data")
                .getAsJsonObject("images")
                .getAsJsonObject("original")
                .get("url")
                .getAsString();
    }
}