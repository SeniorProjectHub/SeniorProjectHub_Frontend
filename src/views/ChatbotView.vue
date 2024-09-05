<template>
  <div class="chatbot-container">
    <div class="chatbot-header">
      <h2>Q&A</h2>
    </div>

    <div class="chatbot-messages" ref="messagesContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.isUser ? 'user-message' : 'bot-message']"
      >
        <div class="message-avatar">
          <div class="avatar-text">{{ message.isUser ? '👤' : '🤖' }}</div>
        </div>
        <div class="message-content">
          <p>{{ message.text }}</p>
          <div v-if="message.references && message.references.length > 0" class="references">
            <h4>References:</h4>
            <ul>
              <li v-for="ref in message.references" :key="ref._id">
                <a :href="`/information/${ref._id}`" target="_blank" rel="noopener noreferrer">{{
                  ref.title
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="message bot-message typing-indicator">
        <div class="message-avatar">
          <div class="avatar-text">🤖</div>
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

    <div class="chatbot-input">
      <input
        type="text"
        v-model="userInput"
        placeholder="Type a message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage" :disabled="!userInput.trim()">
        <span class="send-icon">&#10148;</span>
      </button>
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

    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
      })
    }

    const sendMessage = async () => {
      if (userInput.value.trim() === '') return

      const userMessage: Message = {
        id: Date.now(),
        text: userInput.value,
        isUser: true
      }
      messages.value.push(userMessage)

      const sentMessage = userInput.value
      userInput.value = ''

      scrollToBottom()

      isTyping.value = true

      try {
        const response = await axios.post('http://localhost:5000/chat', {
          query: sentMessage
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
      isTyping
    }
  }
})
</script>

<style scoped>
.chatbot-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

.chatbot-header {
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 15px 0;
  flex-shrink: 0;
}

.chatbot-header h2 {
  margin: 0;
  font-size: 24px;
}

.chatbot-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-message .message-avatar {
  margin-left: 10px;
}

.bot-message .message-avatar {
  margin-right: 10px;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  padding: 12px;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-message .message-content {
  background-color: #007bff;
  color: white;
}

.bot-message .message-content {
  background-color: white;
}

.references {
  margin-top: 10px;
  font-size: 14px;
}

.references h4 {
  margin: 0 0 5px;
  font-weight: bold;
}

.references ul {
  padding-left: 20px;
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

.bot-message .references a {
  color: #0056b3;
}

.chatbot-input {
  display: flex;
  padding: 15px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
}

.chatbot-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
}

.chatbot-input button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
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
  font-size: 18px;
}

.typing-indicator {
  align-self: flex-start;
}

.typing {
  display: flex;
  align-items: center;
}

.typing .dot {
  width: 8px;
  height: 8px;
  background-color: #606060;
  border-radius: 50%;
  margin-right: 4px;
  animation: typingAnimation 1.4s infinite ease-in-out;
}

.typing .dot:nth-child(1) {
  animation-delay: 0s;
}

.typing .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingAnimation {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

@media (min-width: 768px) {
  .chatbot-container {
    max-width: none;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .message {
    max-width: 60%;
  }
}
.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: #e0e0e0;
}

.user-message .message-avatar {
  background-color: #007bff;
  color: white;
}

.bot-message .message-avatar {
  background-color: #28a745;
  color: white;
}
</style>
