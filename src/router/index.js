import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/stock",
    name: "stock",
    component: () => import("../views/StockView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/bill",
    name: "bill",
    component: () => import("../views/BillView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store,
});

router.beforeEach((to, form, next) => {
  const isNotAuthenticated = !store.getters["loginStore/isAuthenticated"];

  if (to.meta.requiresAuth && isNotAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
