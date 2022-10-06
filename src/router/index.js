import { createRouter, createWebHistory } from "vue-router";
import TheContentView from "../views/TheContentView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheContentView,
    },
  ],
});

export default router;
