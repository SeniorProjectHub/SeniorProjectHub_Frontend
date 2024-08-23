<template>
  <div class="chatbot-container">
    <div class="chatbot-header">
      <h2>Chatbot</h2>
    </div>

    <div class="chatbot-messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.isUser ? 'user-message' : 'bot-message']"
      >
        <p>{{ message.text }}</p>
        <div v-if="message.references && message.references.length > 0" class="references">
          <h4>References:</h4>
          <ul>
            <li v-for="ref in message.references" :key="ref._id">
              <router-link :to="`/information/${ref._id}`">{{ ref.title }}</router-link>
            </li>
          </ul>
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
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

    const sendMessage = async () => {
      if (userInput.value.trim() === '') return

      const userMessage: Message = {
        id: Date.now(),
        text: userInput.value,
        isUser: true
      }
      messages.value.push(userMessage)

      try {
        const response = await axios.post('http://localhost:5000/chat', {
          query: userInput.value
        })

        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.data.answer || 'Sorry, something went wrong.',
          isUser: false,
          references: response.data.references || []
        }

        messages.value.push(botMessage)
      } catch (error) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: 'Error: Could not reach the server.',
          isUser: false
        }

        messages.value.push(botMessage)
      }

      userInput.value = ''
    }

    return {
      userInput,
      messages,
      sendMessage
    }
  }
})
</script>

<style scoped>
html,
body {
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
  margin-left: auto;
  text-align: right;
}

.bot-message {
  background-color: #e1e1e1;
  color: black;
}

.references {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.references h4 {
  margin: 0 0 5px;
  font-weight: bold;
}

.references ul {
  padding-left: 20px;
}

.references li {
  list-style-type: disc;
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
