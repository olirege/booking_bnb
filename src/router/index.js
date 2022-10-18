import { createRouter, createWebHistory } from "vue-router";
import TheContentView from "../views/TheContentView.vue";
import TheMapView from "../views/TheMapView.vue";
import TheRoomView from '../views/TheRoomView.vue';
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
    {
      path: "/rooms/:id",
      name: "room",
      component: TheRoomView,
    }
  ],
});

export default router;
