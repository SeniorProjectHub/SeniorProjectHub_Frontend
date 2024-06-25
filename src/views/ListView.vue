<template>
  <div class="document">
    <h1>Document List</h1>
    <div class="document-grid">
      <div v-for="info in informations" :key="info.id" class="document-item">
        <i class="fas fa-file-pdf"></i>
        <span>{{ info.title }}</span>
        <button @click="viewInformation(info.id)">View</button>
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

const viewInformation = (id) => {
  router.push(`/information/${id}`)
}

onMounted(fetchInformations)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.document-item i {
  font-size: 2rem;
  color: #d9534f;
  margin-bottom: 10px;
}

.document-item span {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.document-item button {
  padding: 5px 10px;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.document-item button:hover {
  background-color: #358a60;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
