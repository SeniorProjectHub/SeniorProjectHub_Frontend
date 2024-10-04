import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import InformationView from '../views/InformationView.vue'
import InformationEditView from '../views/InformationEditView.vue'
import UploadView from '../views/UploadView.vue'
import ExtractedView from '../views/ExtractedView.vue'
import SearchView from '../views/SearchView.vue'
import ChatbotView from '../views/ChatbotView.vue'
import AdminView from '../views/AdminDashboardView.vue'
import LoginView from '../views/LoginView.vue'
import StudentView from '../views/StudentDashboardView.vue'
import CallbackPage from '../views/CallBackPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/student',
      name: 'student-dashboard',
      component: StudentView
    },
    {
      path: '/student/list-view',
      name: 'student-document-list',
      component: ListView
    },
    {
      path: '/student/search',
      name: 'student-search',
      component: SearchView
    },
    {
      path: '/student/question',
      name: 'student-qa',
      component: ChatbotView
    },
    {
      path: '/student/information/:id',
      name: 'student-document-information',
      component: InformationView,
      props: true
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminView
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
      path: '/admin/information/:id',
      name: 'admin-information',
      component: InformationView,
      props: true,
      meta: { isAdmin: true } // Use meta to distinguish this route as admin
    },
    {
      path: '/information/:id/edit',
      name: 'information-edit',
      component: InformationEditView
    },
    {
      path: '/admin/upload',
      name: 'upload-document',
      component: UploadView
    },
    {
      path: '/admin/list',
      name: 'document-list',
      component: ListView
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
    },
    {
      path: '/oauth/callback',
      name: 'OAuthCallback',
      component: CallbackPage
  }
  ]
})

export default router
