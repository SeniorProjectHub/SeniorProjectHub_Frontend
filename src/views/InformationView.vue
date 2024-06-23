<template>
  <div>
    <h1>Information Details</h1>
    <div v-if="information">
      <i class="fas fa-file-pdf fa-5x"></i>
      <h2>{{ information.title }}</h2>
      <p><strong>Advisor:</strong> {{ information.advisor }}</p>
      <p><strong>Authors:</strong> {{ information.authors.join(', ') }}</p>
      <p><strong>Subject Tags:</strong> {{ information.subject_tags.join(', ') }}</p>
      <p><strong>Summary:</strong></p>
      <p>{{ information.summary }}</p>
      <p><strong>Timestamp:</strong> {{ new Date(information.timestamp).toLocaleString() }}</p>
      <div class="button-container">
        <button @click="editInformation">Edit</button>
        <button @click="confirmDeleteInformation">Delete</button>
        <button @click="downloadPDF">Download PDF</button>
      </div>
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

<style>
.error {
  color: red;
}
.button-container {
  margin-top: 20px;
}
.button-container button {
  margin-right: 10px;
}
p {
  margin: 10px 0;
}
</style>
