<template>
  <div>
    <h2>Processing Login...</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');

  if (code) {
    try {
      const tokenResponse = await axios.post('http://127.0.0.1:5000/proxy/token', { code });

      if (tokenResponse.status === 200) {
        const accessToken = tokenResponse.data.access_token;
        localStorage.setItem('access_token', accessToken);

        // Fetch user role from the backend
        const roleResponse = await axios.post('http://127.0.0.1:5000/get_user_role', { access_token: accessToken });

        if (roleResponse.status === 200) {
          const userRole = roleResponse.data.role;
          localStorage.setItem('user_role', userRole);

          // Redirect based on the user role
          if (userRole === 'admin') {
            router.push('/admin');
          } else {
            router.push('/student');
          }
        } else {
          console.error('Role not found:', roleResponse.data.error);
          router.push('/login-failed');
        }
      } else {
        console.error('Login failed with status:', tokenResponse.status);
        router.push('/login-failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      router.push('/login-failed');
    }
  } else {
    console.error('Missing authorization code');
    router.push('/login-failed');
  }
});
</script>


