<template>
  <div v-if="cart === null">Nothing In Cart</div>
  <div v-else>
    <h3 v-if="edit" class="font-bold text-5xl">Editing Mode</h3>
    <div class="content-center p-3" v-for="cart_item in cart" :key="cart_item">
      <label>Item No:</label>{{ cart_item }}
      <div><label>Item Count:</label>{{ counts[cart_item] }}</div>
    </div>
    <button class="bg-blue-500 hover:bg-blue-700" @click="order(cart, counts)">
      Order
    </button>
  </div>
</template>

<script>
import api from "../service/api";
export default {
  name: "CheckoutView",
  data() {
    return {
      cart: null,
      counts: {},
      edit:null
    };
  },
  // props:{
  //   ItemValue
  // },
  methods: {
    order: function (cart, counts) {
      let payload = {
        orders: [],
      };

      for (let a of cart) {
        payload.orders.push({ product_id: a, qty: counts[a] });
      }
      if(!this.edit)
        api.order(payload);
      else
        api.orderUpdate(payload,this.edit);
      localStorage.removeItem("cart");
      localStorage.removeItem("key");
    },
  },
  created() {
    if (localStorage.getItem("cart") != null) {
      this.cart = Object.values(localStorage.getItem("cart")).filter(
        (item) => item !== ","
      );
      // const counts = {};
      for (const num of this.cart) {
        this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1;
      }
      this.cart = [...new Set(this.cart)];
    }

    if (localStorage.getItem("key") != null) {
      this.edit = localStorage.getItem("key");
    }
  },
};
</script>

<style scoped></style>
