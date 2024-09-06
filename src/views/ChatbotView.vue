<template>
  <div class="chatbot-container">
    <div class="chat-interface">
      <!-- Greeting section, visible if the chat hasn't started -->
      <div v-if="!isChatStarted" class="greeting-section">
        <div class="greeting-header">
          <img src="../assets/SeniorProjectHub_logo.svg" alt="Logo" class="logo" />
          <h1>Hi, Student</h1>
        </div>
        <div class="question-section">
          <h3>Questions You Can Ask</h3>
          <ul class="question-list">
            <li @click="sendMessage('Who did the project BIRDER?')">Who did the project BIRDER?</li>
            <li @click="sendMessage('What is the project GPT 4 Baker about?')">What is the project GPT 4 Baker about?</li>
            <li @click="sendMessage('Which project involves using AI?')">Which project involves using AI?</li>
          </ul>
        </div>
      </div>

      <!-- Chat messages, visible when the chat has started -->
      <div v-else class="chatbox">
        <div class="chatbot-messages" ref="messagesContainer">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="['message', message.isUser ? 'user-message' : 'bot-message']"
          >
            <div v-if="!message.isUser" class="message-avatar">
              <img src="../assets/SeniorProjectHub_logo.svg" alt="Bot" class="bot-avatar" />
            </div>
            <div class="message-content">
              <p>{{ message.text }}</p>
              <div v-if="message.references && message.references.length > 0" class="references">
                <h4>Reference</h4>
                <ul>
                  <li v-for="ref in message.references" :key="ref._id">
                    <a :href="`/information/${ref._id}`" target="_blank" rel="noopener noreferrer">
                      {{ ref.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="message bot-message typing-indicator">
            <div class="message-avatar">
              <img src="../assets/SeniorProjectHub_logo.svg" alt="Bot" class="bot-avatar" />
            </div>
            <div class="message-content">
              <div class="typing">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input, always visible -->
      <div class="chatbot-input">
        <div class="input-wrapper">
          <input
            type="text"
            v-model="userInput"
            placeholder="Type message..."
            @keyup.enter="sendMessage()"
            @input="validateInput"
          />
          <button @click="sendMessage()" :disabled="!userInput.trim()">
            <span class="send-icon">&#10148;</span>
          </button>
        </div>
      </div>

      <!-- Alert box for non-English input -->
      <div v-if="showAlert" class="alert-box">
        Only English characters are allowed.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

interface Reference {
  _id: string
  title: string
}

interface Message {
  id: number
  text: string
  isUser: boolean
  references?: Reference[]
}

export default defineComponent({
  setup() {
    const userInput = ref('')
    const messages = ref<Message[]>([])
    const messagesContainer = ref<HTMLElement | null>(null)
    const isTyping = ref(false)
    const isChatStarted = ref(false)
    const showAlert = ref(false)

    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
      })
    }

    const validateInput = (event: Event) => {
      const input = (event.target as HTMLInputElement).value
      // eslint-disable-next-line no-useless-escape
      const validInputRegex = /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/
      
      if (!validInputRegex.test(input)) {
        showAlert.value = true
        // eslint-disable-next-line no-control-regex
        userInput.value = userInput.value.replace(/[^\x00-\x7F]/g, '')
        
        // Hide the alert after 3 seconds
        setTimeout(() => {
          showAlert.value = false
        }, 3000)
      } else {
        showAlert.value = false
      }
    }

    const sendMessage = async (presetMessage = '') => {
      const messageText = presetMessage || userInput.value.trim()
      if (messageText === '') return

      isChatStarted.value = true

      const userMessage: Message = {
        id: Date.now(),
        text: messageText,
        isUser: true
      }
      messages.value.push(userMessage)

      userInput.value = ''

      scrollToBottom()

      isTyping.value = true

      try {
        const response = await axios.post('http://localhost:5000/chat', {
          query: messageText
        })

        isTyping.value = false

        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.data.answer || 'Sorry, something went wrong.',
          isUser: false,
          references: response.data.references || []
        }

        messages.value.push(botMessage)
        scrollToBottom()
      } catch (error) {
        isTyping.value = false

        const botMessage: Message = {
          id: Date.now() + 1,
          text: 'Error: Could not reach the server.',
          isUser: false
        }

        messages.value.push(botMessage)
        scrollToBottom()
      }
    }

    onMounted(() => {
      scrollToBottom()
    })

    return {
      userInput,
      messages,
      sendMessage,
      messagesContainer,
      isTyping,
      isChatStarted,
      validateInput,
      showAlert
    }
  }
})
</script>

<style scoped>
.chatbot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
}

.chat-interface {
  display: flex;
  flex-direction: column;
  width: 85%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
}

/* Custom scrollbar for Webkit browsers */
.chatbot-messages::-webkit-scrollbar {
  width: 6px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: #f1f3f5;
  border-radius: 3px;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background-color: #6c757d;
  border-radius: 3px;
  border: 1px solid #f1f3f5;
}

.chatbot-messages::-webkit-scrollbar-thumb:hover {
  background-color: #495057;
}

.greeting-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  width: 100%;
}

.greeting-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
}

.greeting-header h1 {
  font-size: 2rem;
  font-weight: bold;
}

.question-section h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #666;
}

.question-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
}

.question-list li {
  background-color: #f0f2f5;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.question-list li:hover {
  background-color: #e4e6e9;
}

.chatbox {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.message {
  display: flex;
  margin-bottom: 1rem;
}

.bot-message {
  justify-content: flex-start;
  
}

.user-message {
  justify-content: flex-end;
  
}

.message-avatar {
  width: 30px;
  height: 30px;
  margin-top: 1rem;
  margin-right: 0.5rem;
}

.bot-avatar {
  width: 100%;
  height: 100%;
}

.message-content {
  max-width: 70%;
  padding: 0rem 0.8rem;
  border-radius: 18px;
  background-color: white;
  font-size: 0.9rem;
}

.user-message .message-content {
  background-color: whitesmoke;
  color: black;
}

.references {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.references h4 {
  margin: 0 0 0.3rem;
  font-weight: bold;
}

.references ul {
  padding-left: 1rem;
  margin: 0;
}

.references li {
  list-style-type: disc;
}

.references a {
  color: #007bff;
  text-decoration: none;
}

.references a:hover {
  text-decoration: underline;
}

.chatbot-input {
  display: flex;
  justify-content: center;
  padding: 0;
  background-color: #fff;
  width: 100%;
}

.input-wrapper {
  display: flex;
  width: 100%;
  max-width: 800px;
  background-color: #f3f3f3;
  border-radius: 30px;
  padding: 0.5rem;
}

.chatbot-input input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  outline: none;
}

.chatbot-input button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.chatbot-input button:hover {
  background-color: #0056b3;
}

.chatbot-input button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.send-icon {
  font-size: 1.2rem;
}
.typing-indicator {
  align-self: flex-start;
}

.typing {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.typing .dot {
  width: 6px;
  height: 6px;
  background-color: #606060;
  border-radius: 50%;
  margin-right: 3px;
  animation: typingAnimation 1.4s infinite ease-in-out;
}

.alert-box {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4f;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes typingAnimation {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}
</style>
