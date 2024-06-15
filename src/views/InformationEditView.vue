<template>
  <div>
    <h1>Edit Information</h1>
    <form @submit.prevent="updateInformation">
      <div>
        <label for="title">Title</label>
        <input v-model="information.title" type="text" id="title" required />
      </div>
      <div>
        <label for="advisor">Advisor</label>
        <input v-model="information.advisor" type="text" id="advisor" required />
      </div>
      <div>
        <label for="authors">Authors</label>
        <input v-model="information.authors" type="text" id="authors" required />
      </div>
      <div>
        <label for="subject_tags">Subject Tags</label>
        <input v-model="information.subject_tags" type="text" id="subject_tags" required />
      </div>
      <div>
        <label for="summary">Summary</label>
        <textarea v-model="information.summary" id="summary" required></textarea>
      </div>
      <button type="submit">Save</button>
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const information = ref({
  title: '',
  advisor: '',
  authors: [],
  subject_tags: [],
  summary: ''
})
const error = ref(null)
const success = ref(null)

const fetchInformation = async () => {
  try {
    const response = await fetch(`/api/information/${route.params.id}`)
    if (!response.ok) throw new Error(await response.text())
    const data = await response.json()
    information.value = {
      title: data.title,
      advisor: data.advisor,
      authors: data.authors.join(', '),
      subject_tags: data.subject_tags.join(', '),
      summary: data.summary
    }
  } catch (err) {
    error.value = err.message
  }
}

const updateInformation = async () => {
  try {
    const updatedInfo = {
      title: information.value.title,
      advisor: information.value.advisor,
      authors: information.value.authors.split(',').map((author) => author.trim()),
      subject_tags: information.value.subject_tags.split(',').map((tag) => tag.trim()),
      summary: information.value.summary
    }
    const response = await fetch(`/api/information/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedInfo)
    })
    if (!response.ok) throw new Error(await response.text())
    success.value = 'Information updated successfully.'
    setTimeout(() => {
      router.push(`/information/${route.params.id}`)
    }, 2000)
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchInformation)
</script>

<style>
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
form div {
  margin-bottom: 10px;
}
</style>
