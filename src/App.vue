<template>
  <header class="header">
    <div class="logo">
      <RouterLink to="/">
        <img src="@/assets/logo.svg" alt="SeniorProjectHub Logo" />
      </RouterLink>
    </div>
    <nav class="nav-center">
      <RouterLink to="/upload" class="nav-link">Upload</RouterLink>
      <RouterLink to="/list-view" class="nav-link">Document List</RouterLink>
    </nav>
    <div class="user-profile">
      <img src="@/assets/admin-icon.svg" alt="Admin Icon" />
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
  transition: color 0.3s, background-color 0.3s, border-bottom 0.3s;
}

.nav-link:hover {
  border-bottom: 2px solid #2596BE;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-profile img {
  height: 30px;
}
</style>
