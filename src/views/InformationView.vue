<template>
  <div class="information-details">
    <div class="button-container">
      <button class="download-button" @click="downloadPDF">Download this file</button>
      <button class="edit-button" @click="editInformation">Edit Detail</button>
      <button class="delete-button" @click="showDeleteModal = true">Delete Document</button>
    </div>
    <div v-if="information">
      <h2>{{ information.title }}</h2>
      <p>{{ information.authors.join(', ') }}</p>
      <p>{{ information.advisor }}</p>
      <p><strong>Subject tag: </strong> {{ information.subject_tags.join(', ') }}</p>
      <div class="summary">
        <strong>Brief summary</strong>
        <p>{{ information.summary }}</p>
      </div>
      <p><strong>Last Update:</strong> {{ new Date(information.timestamp).toLocaleString() }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <DeleteConfirmationModal
      :show="showDeleteModal"
      @delete="deleteInformation"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'

const route = useRoute()
const router = useRouter()
const information = ref(null)
const error = ref(null)
const showDeleteModal = ref(false)

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

const deleteInformation = async () => {
  try {
    const response = await fetch(`/api/information/${route.params.id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(await response.text())
    router.push('/list-view') // Redirect to the list view after deletion
  } catch (err) {
    error.value = err.message
  }
  showDeleteModal.value = false
}

const downloadPDF = async () => {
  try {
    const response = await fetch(`/api/download/${route.params.id}`, {
      method: 'GET',
    })
    if (!response.ok) throw new Error(await response.text())

    // Simulated PDF download logic
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${information.value.title}.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchInformation)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.information-details {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
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

.button-container button {
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.download-button {
  background-color: #6854f4;
}

.edit-button {
  background-color: #fb8c00;
}

.delete-button {
  background-color: #e53935;
}

.download-button:hover {
  background-color: #3a0066;
}

.edit-button:hover {
  background-color: #e67e22;
}

.delete-button:hover {
  background-color: #c62828;
}
</style>
