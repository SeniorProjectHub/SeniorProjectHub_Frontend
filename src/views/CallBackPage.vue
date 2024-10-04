<template>
  <div>
    <h1>OAuth Callback</h1>
    <p>Code: {{ code }}</p>
    <p>Role: {{ role }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const route = useRoute()
    const code = route.query.code
    const role = route.query.role

    onMounted(() => {
      // Send the code and role to the backend to complete authentication
      axios
        .post('http://localhost:5000/oauth/complete', {
          code: code,
          role: role
        })
        // In the success handler:
        .then((response) => {
          console.log('Authentication successful:', response.data)
          // Redirect based on role
          if (response.data.role === 'student') {
            window.location.href = '/student'
          } else if (response.data.role === 'admin') {
            window.location.href = '/admin'
          }
        })

        .catch((error) => {
          console.error('Error completing OAuth:', error)
        })
    })

    return { code, role }
  }
})
</script>
