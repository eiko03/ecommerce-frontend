<template>
  <div>
    <h4>Register</h4>
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
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
        >Name</label
      >
      <div>
        <input
          id="name"
          type="text"
          v-model="name"
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

      <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
        >E-Mail Address</label
      >
      <div>
        <input
          id="email"
          type="email"
          v-model="email"
          required
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

      <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
        >Password</label
      >
      <div>
        <input
          id="password"
          type="password"
          v-model="password"
          required
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

      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="password-confirm"
        >Confirm Password</label
      >
      <div>
        <input
          id="password-confirm"
          type="password"
          v-model="password_confirmation"
          required
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

      <div>
        <button
          type="submit"
          @click="handleSubmit"
          class="
            inline-block
            align-baseline
            font-bold
            text-sm text-blue-500
            hover:text-blue-800
          "
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../service/api.js";
export default {
  props: ["nextUrl"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        let payload = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        api
          .register(payload)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
            }
          })
          .catch((error) => {
            console.error(error);
            return alert(error.response.data.message);
          });
      } else {
        this.password = "";
        this.password_confirmation = "";

        return alert("Passwords do not match");
      }
    },
  },
};
</script>

<style scoped></style>
