<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="navbar">
    <nav>
      <RouterLink to="/">SeniorProjectHub</RouterLink>
      <RouterLink to="/upload">Upload</RouterLink>
      <RouterLink to="/list-view">Document List</RouterLink>
  </nav>
  </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex; /* Center navigation links horizontally */
  align-items: center; /* Optional: vertically align links */
  padding: 1rem;
  background-color: #2f4f4f;
  color: #fff;
}

.nav-bar a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  margin-right: 1rem;
}

.nav-bar a:hover {
  color: #ddd;
}
</style>
