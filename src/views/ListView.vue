<template>
  <div class="document">
    <h1>Document List</h1>

    <!-- Sort Section -->
    <div class="sort-section">
      <select v-model="selectedSort" class="sort-dropdown">
        <option value="latest">Latest Update</option>
        <option value="year">Year</option>
        <option value="name-az">Name A-Z</option>
        <option value="name-za">Name Z-A</option>
      </select>
    </div>

    <!-- Document Grid -->
    <div class="document-grid">
      <div v-for="info in sortedInformations" :key="info.id" class="document-item">
        <img src="@/assets/pdf.svg" alt="PDF Logo" class="pdf-logo" />
        <router-link
          :to="generateDocumentLink(info.id)"
          class="document-title"
        >
          {{ info.title }}
        </router-link>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const informations = ref([])
const selectedSort = ref('name-az')
const error = ref(null)
const route = useRoute()

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

// Computed property to sort the documents
const sortedInformations = computed(() => {
  let sorted = informations.value

  // Sort by the selected criteria
  if (selectedSort.value === 'latest') {
    sorted = sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  } else if (selectedSort.value === 'year') {
    sorted = sorted.sort((a, b) => new Date(b.year) - new Date(a.year))
  } else if (selectedSort.value === 'name-az') {
    sorted = sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (selectedSort.value === 'name-za') {
    sorted = sorted.sort((a, b) => b.title.localeCompare(a.title))
  }

  return sorted
})

// Function to generate the document link based on the current route
const generateDocumentLink = (id) => {
  if (route.path.startsWith('/admin')) {
    return `/admin/information/${id}`
  }
  else if(route.path.startsWith('/student')){
    return `/student/information/${id}`
  }return `/information/${id}`
  
}

onMounted(fetchInformations)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.document {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.sort-section {
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: flex-end;
}

.sort-dropdown {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  width: 50px;
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
