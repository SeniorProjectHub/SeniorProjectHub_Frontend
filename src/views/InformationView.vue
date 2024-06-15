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

const downloadPDF = () => {
  if (!information.value || !information.value.title) {
    error.value = 'Information or title is not available';
    return;
  }
  
  const filename = `${information.value.title}.pdf`;  // Use the title as the filename
  const url = `/download/${encodeURIComponent(filename)}`;
  console.log(url)

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append the link to the body
  document.body.appendChild(link);
  
  // Programmatically click the link to trigger the download
  link.click();
  
  // Remove the link from the document
  document.body.removeChild(link);
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
