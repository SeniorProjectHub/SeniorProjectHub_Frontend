<template>
  <div>
    <h1>Information List</h1>
    <ul>
      <li v-for="info in informations" :key="info.id">
        <i class="fas fa-file-pdf"></i>
        <span>{{ info.name }}</span>
        <button @click="viewInformation(info.id)">View</button>
      </li>
    </ul>
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
    if (!response.ok) throw new Error(await response.text())
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

<style>
.error {
  color: red;
}
</style>
