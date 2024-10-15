<template>
  <header class="header" v-if="!isLoginRoute">
    <div class="logo">
      <RouterLink :to="logoLink">
        <img src="@/assets/logo.svg" alt="SeniorProjectHub Logo" />
      </RouterLink>
    </div>
    <nav class="nav-center">
      <RouterLink v-if="isAdminRoute" to="/admin/upload" class="nav-link">Upload</RouterLink>
      <RouterLink v-if="isAdminRoute" to="/admin/list" class="nav-link">Document List</RouterLink>
      <RouterLink v-if="isRootRoute" to="/list-view" class="nav-link">Document List</RouterLink>
      <RouterLink v-if="isRootRoute" to="/search" class="nav-link">Browse</RouterLink>
      <RouterLink v-if="isRootRoute" to="/question" class="nav-link">Q&A</RouterLink>
      <RouterLink v-if="isStudentRoute" to="/student/list-view" class="nav-link"
        >Document List</RouterLink
      >
      <RouterLink v-if="isStudentRoute" to="/student/search" class="nav-link">Browse</RouterLink>
      <RouterLink v-if="isStudentRoute" to="/student/question" class="nav-link">Q&A</RouterLink>
    </nav>
    <div class="user-profile">
      <a v-if="isLoggedIn">
        <div class="dropdown">
          <p class="username" >{{ userRole }}</p>
          <img
            src="/src/assets/profile_icon.png"
            alt="Profile Icon"
            class="profile-icon"
            @click="toggleDropdown"
          />
          <div v-if="showDropdown" class="dropdown-menu">
            <p>{{ userName }}</p>
            <button @click="logout">Logout</button>
          </div>
        </div>
      </a>
      <a v-else href="login">
        <button>Login</button>
      </a>
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Retrieve token from localStorage
const token = ref(localStorage.getItem('access_token'))

// Computed property to determine if the user is logged in
const isLoggedIn = computed(() => !!token.value)

const userName = ref(localStorage.getItem('user_name'));  
const userRole = ref(localStorage.getItem('user_role') || 'Guest'); 

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

console.log('Token:', token.value)

const isAdminRoute = computed(() => {
  return [
    '/admin',
    '/admin/upload',
    '/admin/list',
    `/admin/information/${route.params.id}`
  ].includes(route.path)
})

const isRootRoute = computed(() => {
  return ['/', '/search', '/question', '/list-view', `/information/${route.params.id}`].includes(
    route.path
  )
})
const isStudentRoute = computed(() => {
  return [
    '/student',
    '/student/search',
    '/student/question',
    '/student/list-view',
    `/student/information/${route.params.id}`
  ].includes(route.path)
})

// Check if the current route is the login route
const isLoginRoute = computed(() => route.path === '/login')

// Dynamically change the logo link based on the route
const logoLink = computed(() => {
  if (isAdminRoute.value) {
    return '/admin'
  } else if (isStudentRoute.value) {
    return '/student'
  } else {
    return '/'
  }
})

// Logout function
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_role');  // Clear the role as well
  token.value = null;
  router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.header {
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.nav-center {
  display: flex;
  gap: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 20px;
  transition:
    color 0.3s,
    background-color 0.3s,
    border-bottom 0.3s;
}

.nav-link:hover {
  border-bottom: 2px solid #2596be;
}

.user-profile {
  display: flex;
  align-items: center;

}

.user-profile a button {
  background: linear-gradient(90deg, #5d9cec, #8e44ad); /* Gradient colors */
  color: white;
  border: 2px solid white;
  border-radius: 50px; /* Rounded edges */
  padding: 10px 30px; /* Adjust padding for size */
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.user-profile a button:hover {
  transform: scale(1.05); /* Scale up slightly on hover */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add subtle shadow */
}

.user-profile a {
  text-decoration: none;
}

.user-profile img {
  height: 50px;
  
}

.dropdown {
  position: relative;
  display: flex;
  flex-direction: row;
}

.username{
  padding-right: 10px;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  min-width: 150px;
  z-index: 100;
}

.dropdown-menu p {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.dropdown-menu button {
  background-color: #5D9CEC;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: #4A8BE0;
}
</style>
