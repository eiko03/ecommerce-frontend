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

export default createStore({
  modules: {
    product: ProductModule,
  },
});

