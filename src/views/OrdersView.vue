<template>
  <div>
    <div class="content-center p-3" v-for="order in allorders" :key="order.id">
      <label>Order No:</label>{{ order.id }} <label>Order Status:</label
      >{{ order.status }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrdersView",
  data() {
    return {
      orders: [],
    };
  },
  computed: mapGetters(["allorders"]),
  methods: [...mapActions(["fetchorders"])],
  created() {
    this.fetchorders();
  },
};
</script>

<style scoped></style>
