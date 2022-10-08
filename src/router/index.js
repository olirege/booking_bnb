import { createRouter, createWebHistory } from "vue-router";
import TheContentView from "../views/TheContentView.vue";
import TheMapView from "../views/TheMapView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheContentView,
    },
    {
      path: "/map",
      name: "map",
      component: TheMapView,
    },
  ],
});

export default router;
