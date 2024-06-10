import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import InformationView from '../views/InformationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list-view',
      name: 'list-view',
      component: ListView
    },
    {
      path: '/information/:id',
      name: 'information',
      component: InformationView
    }
  ]
})

export default router
