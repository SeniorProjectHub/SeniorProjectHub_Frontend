<template>
  <div class="document">
    <h1>Document List</h1>
    <div class="document-grid">
      <div v-for="info in informations" :key="info.id" class="document-item">
        <img src="@/assets/pdf.svg" alt="PDF Logo" class="pdf-logo" />
        <router-link :to="`/information/${info.id}`" class="document-title">{{ info.title }}</router-link>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const informations = ref([])
const error = ref(null)
const router = useRouter()

const fetchInformations = async () => {
  try {
    const response = await fetch('/api/informations')
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`HTTP ${response.status} - ${response.statusText}: ${errorMessage}`)
    }
    informations.value = await response.json()
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchInformations)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.document {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.document-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.document-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  height: 150px;
}

.document-item .pdf-logo {
  width: 50px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 10px;
}

.document-item .document-title {
  font-weight: bold;
  font-size: 1rem;
  color: black;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.document-item .document-title:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
