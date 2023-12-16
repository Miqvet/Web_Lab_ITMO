import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class test {
    private static final String GIPHY_API_KEY = "Jazc0FfeFNR3GywuSH80iW8Nye8Our1T";

    public static void main(String[] args) throws Exception {
//        String tag = "AngryCat";
//        HttpClient httpClient = HttpClients.createDefault();
//
//        // Создание HTTP GET запроса к Giphy API
//        String url = "https://api.giphy.com/v1/gifs/random?api_key=" + GIPHY_API_KEY + "&tag=" + tag;
//        HttpGet request = new HttpGet(url);
//        HttpResponse response = httpClient.execute(request);
//        HttpEntity entity = response.getEntity();
//        String responseJson = EntityUtils.toString(entity);
//
//        Gson gson = new Gson();
//        JsonObject jsonObject = gson.fromJson(responseJson, JsonObject.class);
//        String gifUrl = jsonObject.getAsJsonObject("data")
//                .getAsJsonObject("images")
//                .getAsJsonObject("original")
//                .get("url")
//                .getAsString();
//        System.out.println(gifUrl);
    }
}
