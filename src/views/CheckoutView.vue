<template>
  <div v-if="cart === null">
    Nothing In Cart
  </div>
  <div v-else>
    <div class="content-center p-3" v-for="cart_item in cart" :key="cart_item">
    <label>Item No:</label>{{cart_item}}
      <div><label>Item Count:</label>{{counts[cart_item]}}</div>


  </div>
    <button
        class="bg-blue-500 hover:bg-blue-700"
    @click="order(cart,counts)">Order</button>
  </div>
</template>

<script>
import api from "../service/api"
export default {
  name: "CheckoutView",
  data() {
    return {
      cart: null,
      counts : {}
    };
  },
  // props:{
  //   ItemValue
  // },
  methods:{
    order: function (cart, counts) {
      console.log(cart);
      console.log(counts);

      let payload = {
        "orders": []
      };

      for(let a of cart)
      {
        payload.orders.push({product_id: a, qty: counts[a] })
      }
      api.order(payload);
      localStorage.removeItem("cart");
    }
  },
  created() {

    if (localStorage.getItem("cart") != null) {
      this.cart =Object.values(localStorage.getItem("cart")).filter(item=>item !== ",")
      // const counts = {};
      for (const num of this.cart) {
        this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1;
      }
      this.cart=[...new Set(this.cart)];
    }
  }
}

</script>

<style scoped>

</style>