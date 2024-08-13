<template>
    <div class="chatbot-container">
      <div class="chatbot-header">
        <h2>Chatbot</h2>
      </div>
      
      <div class="chatbot-messages">
        <div v-for="message in messages" :key="message.id" :class="['message', message.isUser ? 'user-message' : 'bot-message']">
          <p>{{ message.text }}</p>
        </div>
      </div>
      
      <div class="chatbot-input">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="Type a message..." 
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script lang="ts"></script>

  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .chatbot-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
  }
  
  .chatbot-header {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0;
  }
  
  .chatbot-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
  
  .message {
    margin-bottom: 16px;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 75%;
    word-wrap: break-word;
    font-size: 16px;
  }
  
  .user-message {
    background-color: #007bff;
    color: white;
    align-self: flex-end;
  }
  
  .bot-message {
    background-color: #e1e1e1;
    color: black;
  }
  
  .chatbot-input {
    display: flex;
    padding: 20px;
    background-color: #fff;
    border-top: 1px solid #ccc;
  }
  
  .chatbot-input input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-right: 12px;
    font-size: 16px;
  }
  
  .chatbot-input button {
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .chatbot-input button:hover {
    background-color: #0056b3;
  }
  </style>
  