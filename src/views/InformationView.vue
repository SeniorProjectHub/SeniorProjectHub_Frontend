<template>
  <div class="information-details">
    <div class="button-container">
      <button class="download-button" @click="downloadPDF">Download this file</button>
      <button class="edit-button" @click="editInformation">Edit Detail</button>
      <button class="delete-button" @click="confirmDeleteInformation">Delete Document</button>
    </div>
    <div v-if="information">
      <h2>{{ information.title }}</h2>
      <p>{{ information.authors.join(', ') }}</p>
      <p>{{ information.advisor }}</p>
      <p>Subject tag: {{ information.subject_tags.join(', ') }}</p>
      <div class="summary">
        <strong>Brief summary</strong>
        <p>{{ information.summary }}</p>
      </div>
      <p><strong>Timestamp:</strong> {{ new Date(information.timestamp).toLocaleString() }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const information = ref(null)
const error = ref(null)

const fetchInformation = async () => {
  try {
    const response = await fetch(`/api/information/${route.params.id}`)
    if (!response.ok) throw new Error(await response.text())
    information.value = await response.json()
  } catch (err) {
    error.value = err.message
  }
}

const editInformation = () => {
  router.push(`/information/${route.params.id}/edit`)
}

const confirmDeleteInformation = () => {
  if (confirm('Are you sure you want to delete this?')) {
    deleteInformation()
  }
}

const deleteInformation = async () => {
  try {
    const response = await fetch(`/api/information/${route.params.id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(await response.text())
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}

const downloadPDF = async () => {
  try {
    const response = await fetch(`/download/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf'
      }
    })
    if (!response.ok) throw new Error(await response.text())

    // Simulated PDF download logic
    // const blob = await response.blob()
    // const url = window.URL.createObjectURL(blob)
    // const link = document.createElement('a')
    // link.href = url
    // link.setAttribute('download', `${information.value.title}.pdf`)
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
    // window.URL.revokeObjectURL(url)
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchInformation)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.information-details {
  font-family: 'Inter', sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

p {
  margin: 10px 0;
  font-size: 1rem;
}

.summary {
  text-align: left;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  background-color: #f3f3f3;
}

.summary strong {
  font-size: 1.1rem;
}

.error {
  color: red;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.download-button {
  background-color: #4B0082;
  color: white;
}

.edit-button {
  background-color: #fb8c00;
  color: white;
}

.delete-button {
  background-color: #e53935;
  color: white;
}

.button-container button {
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-container button:hover {
  opacity: 0.9;
}
</style>
