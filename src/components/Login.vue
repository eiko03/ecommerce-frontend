<template>
  <h4>Login</h4>
  <form
    class="
      flex flex-col
      justify-center
      items-center
      bg-white
      shadow-md
      rounded
      px-8
      pt-6
      pb-8
      mb-4
    "
  >
    <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
      >E-Mail Address</label
    >
    <div class="mb-6">
      <input
        id="email"
        type="email"
        v-model="email"
        required
        autofocus
        class="
          shadow
          appearance-none
          border
          rounded
          w-full
          py-2
          px-3
          text-gray-700
          leading-tight
          focus:outline-none focus:shadow-outline
        "
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
        >Password</label
      >
      <div>
        <input
          class="
            shadow
            appearance-none
            border border-red-500
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          id="password"
          type="password"
          v-model="password"
          required
        />
      </div>
    </div>
    <div>
      <button
        class="
          inline-block
          align-baseline
          font-bold
          text-sm text-blue-500
          hover:text-blue-800
        "
        type="submit"
        @click="handleSubmit"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script>
import api from "../service/api.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        let paylaod = {
          email: this.email,
          password: this.password,
        };
        api
          .login(paylaod)
          .then((response) => {
            let is_admin = response.data.is_admin;
            response.data.user.is_admin = is_admin;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.access_token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                if (is_admin === 1) {
                  this.$router.push("admin");
                } else {
                  this.$router.push("dashboard");
                }
              }
            }
          })
          .catch(function (error) {
            console.error(error.response);
            return alert(error.response.data.message);
          });
      }
    },
  },
};
</script>
