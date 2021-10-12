<template>
  <div id="nav">
    <router-link to="/login" v-if="!user">Login |</router-link>
    <router-link to="/register" v-if="!user">Register |</router-link>
    <router-link to="/orders">Orders |</router-link>
    <a href="/#" @click="logout_clear"> Logout |</a>
<router-link to="/products" v-if="user">Products |</router-link>
    <router-link to="/checkout" v-if="user || admin">Checkout |</router-link>
    <router-link to="/create_product" v-if="admin">Add Product</router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      cart: null,
      user: null,
      admin:null
    };
  },
  methods: {
    logout_clear() {
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
    try {
      if (JSON.parse(localStorage.getItem("user")).is_admin === 1) this.admin = 1;
    } catch {
      this.admin = null;
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
