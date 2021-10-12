import axios from "axios";

const appClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});
let header = {
  headers: {
    Authorization: "bearer " + localStorage.getItem("jwt"),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default {
  login(payload) {
    return appClient.post("auth/login/", payload);
  },
  register(payload) {
    return appClient.post("auth/register/", payload);
  },
  get_products() {
    return appClient.get("product", header);
  },
};
