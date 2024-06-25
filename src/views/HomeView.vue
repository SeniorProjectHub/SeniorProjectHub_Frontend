<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="main-content">
    <div class="welcome-message">
      <h1>Hi, Admin</h1>
      <h2>Welcome To SeniorProjectHub</h2>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); /* Subtract header height */
  /* background: linear-gradient(
    73.26deg,
    #070537 0.87%,
    #615882 33.62%,
    #c33538 86.86%,
    #dc8e00 113.01%,
    #a8eb12 129.03%
  ); */
  color: white;
  text-align: center;
}

.welcome-message {
  display: flex;
  flex-direction: column; /* Change to column to stack vertically */
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  position: absolute;
  width: 594px;
  height: 116px;
  left: calc(50% - 594px / 2);
  top: calc(50% - 116px / 2);
}

.welcome-message h1, .welcome-message h2 {
  font-family: 'Inter';
  color: black; /* Inside auto layout */
}

.welcome-message h1 {
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
}

.welcome-message h2 {
  font-weight: 400;
  font-size: 24px; /* Adjust font size as needed */
  line-height: 32px; /* Adjust line height as needed */
}
</style>
