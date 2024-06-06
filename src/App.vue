<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="navbar">
      <nav>
        <RouterLink to="/">SeniorProjectHub</RouterLink>
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

h4 {
  font-size: 20px;
}
</style>
