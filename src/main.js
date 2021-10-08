import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import Axios from "axios";


const app= createApp(App).use(store).use(router).mount("#app");
app.provide("$axios", Axios);
