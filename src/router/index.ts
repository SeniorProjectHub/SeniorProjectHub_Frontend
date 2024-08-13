import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import InformationView from '../views/InformationView.vue'
import InformationEditView from '../views/InformationEditView.vue'
import UploadView from '../views/UploadView.vue'
import ExtractedView from '../views/ExtractedView.vue'
import SearchView from '../views/SearchView.vue'
import ChatbotView from '../views/ChatbotView.vue'

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
      component: InformationView,
      props: true
    },
    {
      path: '/information/:id/edit',
      name: 'information-edit',
      component: InformationEditView
    },
    {
      path: '/upload',
      name: 'upload-document',
      component: UploadView
    },
    {
      path: '/extracted-data',
      name: 'extracted-data',
      component: ExtractedView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/question',
      name: 'question',
      component: ChatbotView
    }
  ]
})

export default router
