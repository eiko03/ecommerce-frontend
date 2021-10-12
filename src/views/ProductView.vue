<template>
  <h3 v-if="edit" class="font-bold text-5xl">Editing Mode</h3>
  <div class="grid grid-cols-3">
    <!--    <div-->
    <!--      class="-->
    <!--        border-2-->
    <!--        backdrop-grayscale(127,127,127)-->
    <!--        bg-origin-padding-->
    <!--        border-r-2-->
    <!--        select-text-->
    <!--        relative-->
    <!--        cursor-pointer-->
    <!--      "-->
    <table
      class="flex border-0 p-3.5 text-gray-600"
      v-for="products in allproducts"
      :key="products.id"
    >
      <td>
        <div class="card-header">
          <label>Product Name:</label> {{ products.name.slice(0, 10) }}
        </div>
        <div class="card-body">
          <label>Product Description:</label
          >{{ products.description.slice(0, 10) }}
          <div><label>Product Qty:</label>{{ products.qty }}</div>
        </div>
        <div class="card-footer">
          <label>Product Price:</label>{{ products.price }}
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700"
          @click="handleCart(products.id)"
        >
          Add To Cart
        </button>
      </td>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductView",
  data() {
    return {
      cart: [],
      edit:null,
    };
  },
  computed: mapGetters(["allproducts"]),
  methods: {
    ...mapActions(["fetchproducts"]),
    handleCart(id) {
      let cart = [];
      console.log(JSON.stringify(cart));
      if (this.cart !== cart) {
        cart = this.cart;
      }
      // if (!localStorage.getItem("cart")) {
      //  cart = { orders: [{ product_id: id, qty: 1 }] };
      cart.push(id);
      localStorage.setItem("cart", cart);
    },
  },
  created() {
    console.log(localStorage.getItem("cart"));
    this.fetchproducts();
    if (localStorage.getItem("cart") != null) {
      this.cart = Object.values(localStorage.getItem("cart"));
    }
    if (localStorage.getItem("key") != null) {
      this.edit = localStorage.getItem("key");
    }
  },
};
</script>

<style scoped></style>
