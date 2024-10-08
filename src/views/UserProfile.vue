<template>
    <div class="profile-container" v-if="userInfo">
      <h2>User Information</h2>
      <ul>
        <li v-for="(value, key) in userInfo" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const userInfo = ref(null);
  
  onMounted(async () => {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the access token
  
    if (accessToken) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/get_basic_info', {
          access_token: accessToken
        });
  
        console.log('API Response:', response.data); // Log the entire response to inspect the structure
  
        if (response.status === 200) {
          userInfo.value = response.data;
        } else {
          console.error('Failed to fetch user info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    } else {
      console.error('Access token is missing');
    }
  });
  </script>
  
  <style scoped>
  .profile-container {
    padding: 20px;
    font-family: 'Inter', sans-serif;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
  </style>
  