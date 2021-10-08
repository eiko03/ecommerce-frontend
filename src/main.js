import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import Axios from "axios";
import dotenv from "dotenv";

let app;
dotenv.config();
const axiosInstance = Axios.create({
  baseURL: process.env.BASE_API_URL,
});

app = createApp(App).use(store).use(router).mount("#app");
app.provide("$axios", axiosInstance);
