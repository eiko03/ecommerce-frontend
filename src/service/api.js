import axios from "axios";
const appClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});
export default {
  login(payload) {
    return appClient.post("auth/login/", payload);
  },
  register(payload) {
    return appClient.post("auth/register/", payload);
  },
};
