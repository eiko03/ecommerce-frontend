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
  order(payload) {
    return appClient.post("order", payload, header);
  },
  orderUpdate(payload, product_id) {
    return appClient.put("order/" + product_id, payload, header);
  },
  get_orders() {
    return appClient.get("order", header);
  },
  get_all_orders() {
    return appClient.get("order", header);
  },
  change_order_status(product_id) {
    return appClient.get("order" + product_id + "/change_status", header);
  },
  accept(payload, product_id) {
    return appClient.post(
      "order" + product_id + "/change_status",
      payload,
      header
    );
  },
  createProduct(payload) {
    return appClient.post("product/", payload, header);
  },
};
