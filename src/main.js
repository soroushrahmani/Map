import { createApp } from "vue";
import App from "./App.vue";
import * as VueGoogleMaps from "vue3-google-map";
const license = {
  load: {
    key: "AIzaSyCsuHKQe4gZH_MMHr23uqukStCxJxQ-NoA",
  },
};
const app = createApp(App);
app.use(VueGoogleMaps, license)
app.mount("#app");