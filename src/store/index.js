import { createStore } from "vuex";
import api from "../service/api.js";

const ProductModule = {
  state: {
    products: [],
  },
  getters: {
    allproducts: (state) => state.products,
  },
  mutations: {
    setproducts: (state, products) => (state.products = products),
  },
  actions: {
    async fetchproducts({ commit }) {
      const response = await api.get_products();
      commit("setproducts", response.data);
    },
  },
};

const OrderModule = {
  state: {
    orders: [],
  },
  getters: {
    allorders: (state) => state.products,
  },
  mutations: {
    setorders: (state, orders) => (state.orders = orders),
  },
  actions: {
    async fetchorders({ commit }) {
      const response = await api.get_orders();
      commit("setorders", response.data);
    },
  },
};

export default createStore({
  modules: {
    product: ProductModule,
    order: OrderModule,
  },
});

