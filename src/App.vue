<template>
  <div id="nav">
    <router-link to="/login" v-if="!user">Login |</router-link>
    <router-link to="/register" v-if="!user">Register |</router-link>
    <router-link to="/logout" v-if="user">Logout |</router-link>
    <router-link to="/orders" >Orders |</router-link>
    <a href="/#" v-on:click.prevent="logout" > Logout |</a>
    <router-link to="/checkout" v-if="cart">Checkout</router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      cart: null,
      user: null,
    };
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.push("login");
    },
  },
  created() {
    if (localStorage.getItem("cart") != null) {
      this.cart = Object.values(localStorage.getItem("cart"));
    }
    if (localStorage.getItem("user") != null) {
      this.user = Object.values(localStorage.getItem("user"));
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
