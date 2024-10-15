<template>
  <div class="login-container">
    <div class="left-content">
      <div class="info">
        <h1>SeniorProjectHub</h1>
        <p>connects you to instant answers, full project PDFs, and all senior project details in one platform.</p>
      </div>
      <img src="@/assets/computer_logo.png" alt="Computer Logo" class="logo-image" />
    </div>

    <div class="right-content">
      <div class="login-action">
        <div class="login-box" >
          <img src="@\assets\login_arrow.png" alt="login-arrow" class="login-arrow" >
        <p class="login-text">Login</p>
        </div>
        <img 
          src="@/assets/Botton-cmu-CMU1_Base.png" 
          alt="CMU Account Login" 
          class="login-image" 
          @click="login"
        />
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

  // Redirect the user directly to the OAuth provider
  window.location.href = authUrl;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw; /* Ensure the container spans the full width of the screen */
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  position: relative;
}

.left-content, .right-content {
  flex: 1; /* Make both sides take equal width */
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-content {
  flex-direction: column;
  padding-left: 5%;
}

.right-content {
  flex-direction: column;
  padding-right: 5%;
}

.info {
  text-align: left;
  max-width: 600px; /* Set the maximum width for the text to balance size */
}

.info h1 {
  font-size: 4rem; /* Increase the font size for better emphasis */
  font-weight: 700;
  color: #2596be;
}

.info p {
  font-size: 1.5rem;
  color: #333;
  margin-top: 10px;
  line-height: 1.5;
}

.logo-image {
  width: 400px; /* Make the logo larger */
  margin-top: 20px;
}

.login-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.login-text {
  font-size: 1.5rem; /* Increase the text size for better readability */
  font-weight: bold;
  margin-bottom: 20px;
}

.login-arrow {
  width: 75px; /* Increase the size of the login arrow */
  align-items: center; /* Add some space between the arrow and text */
}
.login-box{
  display: flex;
  flex-direction: row;
}
.login-box p{
  text-align: center;
  align-items: center;
}


.login-image {
  cursor: pointer;
  width: 300px; /* Increase the size of the login button */
  transition: transform 0.3s ease;
}

.login-image:hover {
  transform: scale(1.05); /* Hover effect */
}


</style>
