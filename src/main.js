import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import Axios from "axios";
import VueAxios from "vue-axios";


// eslint-disable-next-line no-unused-vars
let app;

app = createApp(App).use(store).use(router).use(VueAxios, Axios).mount("#app");
