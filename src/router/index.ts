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
import ProfilePage from '../views/UserProfile.vue'


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
      component: StudentView,
      meta: { isStudent: true }
    },
    {
      path: '/student/list-view',
      name: 'student-document-list',
      component: ListView,
      meta: { isStudent: true }
    },
    {
      path: '/student/search',
      name: 'student-search',
      component: SearchView,
      meta: { isStudent: true }
    },
    {
      path: '/student/question',
      name: 'student-qa',
      component: ChatbotView,
      meta: { isStudent: true }
    },
    {
      path: '/student/information/:id',
      name: 'student-document-information',
      component: InformationView,
      props: true,
      meta: { isStudent: true }
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminView,
      meta: { isAdmin: true }
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
      component: UploadView,
      meta: { isAdmin: true }
    },
    {
      path: '/admin/list',
      name: 'document-list',
      component: ListView,
      meta: { isAdmin: true }
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
    },{
      path:'/profile',
  name:'Profile',
   component: ProfilePage  }
  ]
})

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('user_role');
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check if the user is logged in

  // Define routes restricted for logged-in users
  const restrictedRoutes = ['/', '/search', '/question', '/list-view', `/information/:id`];

  if (restrictedRoutes.includes(to.path) || to.name === 'information') {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        return next('/admin');
      } else if (userRole === 'student') {
        return next('/student');
      }
    }
  }

  // Check if the route is admin-only and user is not admin
  if (to.matched.some(record => record.meta.isAdmin) && userRole !== 'admin') {
    if (userRole === 'student') {
      return next('/student');
    } else {
      return next('/');
    }
  }

  // Check if the route is student-only and user is not student
  if (to.matched.some(record => record.meta.isStudent) && userRole !== 'student') {
    if (userRole === 'admin') {
      return next('/admin');
    } else {
      return next('/');
    }
  }

  next(); // Proceed if no restrictions
});


export default router
