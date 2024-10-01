<template>
  <header class="header">
    <div class="logo">
      <!-- Dynamically change the link destination based on whether it's an admin route -->
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
      <RouterLink v-if="isStudentRoute" to="/student/list-view" class="nav-link">Document List</RouterLink>
      <RouterLink v-if="isStudentRoute" to="/student/search" class="nav-link">Browse</RouterLink>
      <RouterLink v-if="isStudentRoute" to="/student/question" class="nav-link">Q&A</RouterLink>
    </nav>
    <div class="user-profile" v-if="isRootRoute">
      <button>Login</button>
    </div>
    <div class="user-profile" v-if="isAdminRoute">
      <p>Admin</p>
      <img src="@/assets/admin-icon.svg" alt="Admin Icon" />
    </div>
    <div class="user-profile" v-if="isStudentRoute">
      <p>Student</p>
      <img src="@/assets/admin-icon.svg" alt="Admin Icon" />
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Show admin-related links when the current path starts with "/admin"
const isAdminRoute = computed(() => {
  return ['/admin', '/admin/upload', '/admin/list', `/admin/information/${route.params.id}`].includes(route.path)
})

// Show root-related links when the current path is exactly "/" or matches certain paths
const isRootRoute = computed(() => {
  return ['/', '/search', '/question', '/list-view' ,`/information/${route.params.id}`].includes(route.path)
})
const isStudentRoute = computed(() => {
  return ['/student', '/student/search', '/student/question', '/student/list-view' ,`/student/information/${route.params.id}`].includes(route.path)
})

// Dynamically change the logo link based on the route
const logoLink = computed(() => {
  if (isAdminRoute.value) {
    return '/admin';
  } else if (isStudentRoute.value) {
    return '/student';
  } else {
    return '/';
  }
});
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

.user-profile img {
  height: 30px;
}
</style>
