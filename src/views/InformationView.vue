<template>
  <div>
    <h1>Information Details</h1>
    <div v-if="information">
      <i class="fas fa-file-pdf fa-5x"></i>
      <p>{{ information.name }}</p>
      <p>{{ information.details }}</p>
      <button @click="editInformation">Edit</button>
      <button @click="deleteInformation">Delete</button>
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

const deleteInformation = async () => {
  try {
    const response = await fetch(`/api/information/${route.params.id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(await response.text())
    router.push('/')
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
</style>
