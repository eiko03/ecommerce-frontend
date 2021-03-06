import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/LoginView";
import Products from "../views/ProductView";
import Register from "../views/RegisterView";
import Checkout from "../views/CheckoutView";
import Orders from "../views/OrdersView";
import UserBoard from "../components/UserBoard";
import ProductCreate from "../views/CreateProductView";
// import Admin from "@/components/Admin";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: "/dashboard",
    name: "userboard",
    component: UserBoard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create_product",
    name: "create_product",
    component: ProductCreate,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next();
        } else {
          next({ name: "userboard" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else {
      next({ name: "userboard" });
    }
  } else {
    next();
  }
});

export default router;
