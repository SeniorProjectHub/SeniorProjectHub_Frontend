<template>
  <div class="information-details">
    <h1>Edit Information</h1>
    <form @submit.prevent="updateInformation">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="information.title" type="text" id="title" required />
      </div>
      <div class="form-group">
        <label for="advisor">Advisor</label>
        <input v-model="information.advisor" type="text" id="advisor" required />
      </div>
      <div class="form-group">
        <label for="authors">Authors</label>
        <input v-model="information.authors" type="text" id="authors" required />
      </div>
      <div class="form-group">
        <label for="subject_tags">Subject Tags</label>
        <input v-model="information.subject_tags" type="text" id="subject_tags" required />
      </div>
      <div class="form-group">
        <label for="summary">Summary</label>
        <textarea v-model="information.summary" id="summary" required></textarea>
      </div>
      <button type="submit" class="save-button">Save</button>
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
  authors: '',
  subject_tags: '',
  summary: '',
  category: ''
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
      summary: data.summary,
      category: data.category
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
      summary: information.value.summary,
      category: information.value.category
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.information-details {
  font-family: 'Inter', sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #4B0082;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #4B0082;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #3a0066;
}

.success, .error {
  margin-top: 15px;
  font-size: 1rem;
  text-align: center;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
