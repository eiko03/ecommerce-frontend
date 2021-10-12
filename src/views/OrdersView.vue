<template>
  <div>
    <div>{{allorders}}</div>
<!--    <div class="content-center p-3" v-for="order in allorders" :key="order.id">-->
<!--    <label>Item No:</label>{{order.id}}-->
<!--  </div>-->

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "OrdersView",
  data(){
    return {
      orders:[]
    }
  },
  computed: mapGetters(["allorders"]),
  methods: [
    ...mapActions(["fetchorders"]),

  ],
  created() {
    this.fetchorders();

  },
}
</script>

<style scoped>

</style>