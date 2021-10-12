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
        <div
          v-if="admin && order[0].orders[0]['pivot']['status'] === 0"
          class="bg-gray-500 hover:bg-blue-700"
        >
          <select >
            <option disabled value="">Select</option>
            <option
              v-for="item in dropdown"
              :key="item"
              :value="item"
              @change="accept(item, key)"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <button v-else class="bg-gray-500 hover:bg-blue-700" @click="edit(key)">
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
      admin: 0,
      dropdown: [
        "processing",
        "approoved",
        "rejected",
        "processing",
        "shipped",
        "delivered",
      ],
    };
  },
  methods: {
    edit(key) {
      localStorage.setItem("key", key);
      if (JSON.parse(localStorage.getItem("user")).is_admin !== 1) {
        this.$router.push("/products/");
      }
    },
    accept(item, key) {
      let payload = {
        status_id: this.dropdown.indexOf(item),
      };
      let response = api.change_order_status(payload, key);
      console.log(response);
    },
  },

  async created() {
    let response = null;
    this.admin = JSON.parse(localStorage.getItem("user")).is_admin;
    if (this.admin === 1) {
      response = await api.get_all_orders();
    } else {
      response = await api.get_orders();
    }
    this.orders = await response.data;
  },
};
</script>

<style scoped></style>
