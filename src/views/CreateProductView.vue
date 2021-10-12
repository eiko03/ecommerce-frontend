<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
        <p class="mt-1 text-sm text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form action="#">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="company-website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    v-model="name"
                    class="
                      focus:ring-indigo-500 focus:border-indigo-500
                      flex-1
                      block
                      w-full
                      rounded-none rounded-r-md
                      sm:text-sm
                      border-gray-300
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <label for="about" class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div class="mt-1">
            <textarea
              v-model="description"
              id="about"
              name="about"
              rows="3"
              class="
                shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500
                mt-1
                block
                w-full
                sm:text-sm
                border border-gray-300
                rounded-md
              "
            ></textarea>
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Brief description for your Product
          </p>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <label for="about" class="block text-sm font-medium text-gray-700">
            price
          </label>
          <div class="mt-1">
            <input
              v-model="price"
              type="number"
              class="
                shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500
                mt-1
                block
                w-full
                sm:text-sm
                border border-gray-300
                rounded-md
              "
            />
          </div>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <label for="about" class="block text-sm font-medium text-gray-700">
            Qty
          </label>
          <div class="mt-1">
            <input
              v-model="qty"
              type="number"
              class="
                shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500
                mt-1
                block
                w-full
                sm:text-sm
                border border-gray-300
                rounded-md
              "
            />
          </div>
        </div>

        <div class="col-span-3 sm:col-span-2">
          <label
            for="company-website"
            class="block text-sm font-medium text-gray-700"
          >
            Photo Link
          </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span
              class="
                inline-flex
                items-center
                px-3
                rounded-l-md
                border border-r-0 border-gray-300
                bg-gray-50
                text-gray-500 text-sm
              "
            >
              http://
            </span>
            <input
              v-model="image"
              type="text"
              name="company-website"
              id="company-website"
              class="
                focus:ring-indigo-500 focus:border-indigo-500
                flex-1
                block
                w-full
                rounded-none rounded-r-md
                sm:text-sm
                border-gray-300
              "
              placeholder="www.example.com"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            @click="handleSubmit"
            class="
              ml-5
              bg-white
              py-2
              px-3
              border border-gray-300
              rounded-md
              shadow-sm
              text-sm
              leading-4
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../service/api.js";
export default {
  data() {
    return {
      name: "",
      description: "",
      price: 0,
      qty: 0,
      image: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      let paylaod = {
        name: this.name,
        description: this.description,
        price: parseInt(this.price),
        qty: parseInt(this.qty),
        image: this.image,
      };
      api
        .createProduct(paylaod)
        .then((response) => {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          return alert(error.response.data.message);
        });
    },
  },
};
</script>

<style scoped></style>
