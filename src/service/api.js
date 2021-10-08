import axios from "axios";
const appClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});
export default {
  login(paylaod) {
    console.log("base", process.env.VUE_APP_BASE_API_URL);
    return appClient.post("auth/login/", paylaod);
  },
};
