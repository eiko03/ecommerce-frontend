<template>
  <div>
    <div
      class="content-center p-3"
      v-for="(order, key) in orders"
      :key="order.key"
    >
      <h3>OrderId: {{ key }}</h3>

      <div v-for="order_detail in order" :key="order_detail.id">
        <label>Product:</label> {{ order_detail.product_id }}
        <label>Qty:</label> {{ order_detail.qty }}
      </div>
      <label>Edit Level:</label>{{ order[0].edit_level }}
      <label>Status Level:</label>{{ order[0].orders[0]["pivot"]["status"] }}
      <div>
        <button class="bg-gray-500 hover:bg-blue-700" @click="edit(key)">
          Edit Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../service/api";
export default {
  name: "OrdersView",
  data() {
    return {
      orders: [],
      status: null,
    };
  },
  methods: {
    edit(key) {
      localStorage.setItem("key", key);
      this.$router.push("/products/");
    },
  },

  async created() {
    const response = await api.get_orders();
    this.orders = await response.data;
  },
};
</script>

<style scoped></style>
