<template>
  <div class="container">
    <p>Which role would you like to login as?</p>
    <div class="login-containers">
      <div class="student-login" @click="loginAs('student')">
        <p>Student</p>
        <img src="../assets/Botton-cmu-CMU1_Base.png" alt="Student Login" />
      </div>
      <div class="admin-login" @click="loginAs('admin')">
        <p>Admin</p>
        <img src="../assets/Botton-cmu-CMU1_Base.png" alt="Admin Login" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    loginAs(role: string) {
      // Ensure the correct port is used
      window.location.href = `http://127.0.0.1:5000/login/${role}`
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
