<template>
  <div class="login-container">
    <div class="info">
      <h1>SeniorProjectHub</h1>
      <p>connects you to instant answers, full project PDFs, and all senior project details in one platform.</p>
    </div>
    <div class="login-button">
      <div class="login-option" @click="login">
        <img src="@/assets/Botton-cmu-CMU1_Base.png" alt="CMU Account" />
        <p>CMU Account</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const login = () => {
  const clientId = 'vT9Skzt5hbGBawJ5KEuS3QZJ9Zvuy5ZAu5sHqdMy';
  const redirectUri = 'http://localhost:5173/oauth/callback';
  const authorizationUrl = 'https://oauth.cmu.ac.th/v1/Authorize.aspx'; // CMU OAuth URL

  // Construct the authorization URL
  const authUrl = `${authorizationUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=cmuitaccount.basicinfo`;

  console.log('Authorization URL:', authorizationUrl);
  console.log('Client ID:', clientId);
  console.log('Redirect URI:', redirectUri);
  console.log('Constructed Auth URL:', authUrl);

  // Redirect the user directly to the OAuth provider
  window.location.href = authUrl;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Inter', sans-serif;
}

.info {
  text-align: center;
  margin-bottom: 20px;
}

.info h1 {
  font-size: 2.5rem;
  color: #2596be;
}

.info p {
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-option {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0c9f7;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-option:hover {
  background-color: #d1b3f0;
}

.login-option img {
  height: 40px;
  margin-right: 10px;
}

.login-option p {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
</style>
