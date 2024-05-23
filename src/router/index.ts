import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ListView from '../views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project-view',
      name: 'project-view',
      component: ProjectView
    },
    {
      path: '/list-view',
      name: 'list-view',
      component: ListView
    }
  ]
})

export default router
