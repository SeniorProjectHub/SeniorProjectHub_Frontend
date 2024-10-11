<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="main-content">
    <div class="welcome-message">
      <h1>Hi, Student</h1>
      <h2>Welcome To SeniorProjectHub</h2>
      <h3>What Can You Do With SeniorProjectHub?</h3>
      <div class="features">
        <ul>
          <li>Ask questions and receive immediate responses related to Senior Projects</li>
          <li>Access completed Senior Project PDF document files</li>
          <li>View all project information consolidated in one convenient platform</li>
        </ul>
      </div>
      <div class="button-container">
        <a href="/student/question">
          <button class="ask-button">Ask Now</button>
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); 
  background: linear-gradient(
    73.26deg,
    #070537 0.87%,
    #615882 33.62%,
    #c33538 86.86%,
    #dc8e00 113.01%,
    #a8eb12 129.03%
  );
  color: white;
}

.welcome-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; 
  padding: 20px;
  gap: 20px;
  position: relative;
  width: 700px; 
  text-align: left; 
}

.welcome-message h1,
.welcome-message h2 {
  font-family: 'Inter';
  color: white;
}

.welcome-message h1 {
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
}

.welcome-message h2 {
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 20px;
}

.welcome-message h3 {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 10px;
}

.features ul {
  list-style-type: disc; 
  padding-left: 20px; 
  font-size: 18px;
  line-height: 1.5;
  color: #ffffff;
}

.features ul li {
  margin-bottom: 10px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center; 
}

.ask-button {
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.ask-button:hover {
  background-color: #333;
}
</style>
