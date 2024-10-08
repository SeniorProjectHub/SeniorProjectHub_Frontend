<template>
  <div class="search-page">
    <h2>Search Projects</h2>
    <header class="search-header">
      <input
        v-model="globalQuery"
        @input="onGlobalInputChange"
        type="text"
        placeholder="Search by All"
        class="global-search-input"
        @keypress="validateInput"
      />

      <button @click="performGlobalSearch" class="global-search-button">
        <i class="fa fa-search"></i>
      </button>
    </header>
    <div class="browse-projects">
      <div class="tabs">
        <button :class="{ active: searchBy === 'Title' }" @click="searchBy = 'Title'">
          By Title
        </button>
        <button :class="{ active: searchBy === 'Tag' }" @click="searchBy = 'Tag'">By Tag</button>
        <button :class="{ active: searchBy === 'Advisor' }" @click="searchBy = 'Advisor'">
          By Advisor
        </button>
      </div>
      <div class="search-section">
        <input
          v-model="query"
          @input="onInputChange"
          @keyup.enter="performSearch"
          type="text"
          :placeholder="'Search by ' + searchBy"
          class="search-input"
          @keypress="validateInput"
        />
        <select v-model="year" class="year-select">
          <option value="">All Years</option>
          <option v-for="yearOption in yearOptions" :key="yearOption" :value="yearOption">
            {{ yearOption }}
          </option>
        </select>
        <button @click="performSearch" class="search-button">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div v-if="showAlert" class="alert-box">
        Invalid character entered. Only English, numbers, and special characters are allowed.
      </div>
      <div class="search-results">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="searchPerformed && results.length === 0" class="no-results">
          No results found
        </div>
        <ul v-else>
          <li v-for="(result, index) in results" :key="index" class="result-item">
            <h3 class="result-title">
              <router-link :to="generateDocumentLink(result._id)">{{ result.title }}</router-link>
            </h3>
            <p class="result-authors">Student: {{ result.authors.join(', ') }}</p>
            <p class="result-advisor">Advisor: {{ result.advisor }}</p>
            <p class="result-tags">Tags: {{ result.subject_tags.join(', ') }}</p>
            <p>{{ result.time_stamp }}</p>
            <button class="expand-summary-button" @click="toggleSummary(index)">
              <i class="fa fa-search"></i> Expand Summary
            </button>
            <div v-if="expandedIndex === index" class="result-summary">
              <p>{{ result.summary }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const globalQuery = ref('')
const query = ref('')
const results = ref<
  Array<{
    _id: string
    title: string
    authors: string[]
    advisor: string
    subject_tags: string[]
    summary: string
    time_stamp: string
  }>
>([])
const loading = ref(false)
const searchBy = ref('Title')
const year = ref('')
const yearOptions = ref<string[]>([])
const expandedIndex = ref<number | null>(null)
const searchPerformed = ref(false)
const showAlert = ref(false)

globalQuery.value = '' // Clear global query after search
query.value = '' // Clear search query after search

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const validateInput = (event: KeyboardEvent) => {
  const char = (event.target as HTMLInputElement).value + event.key
  // eslint-disable-next-line no-useless-escape
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/

  if (!regex.test(char)) {
    event.preventDefault()
    showAlert.value = true
    setTimeout(() => {
      showAlert.value = false
    }, 3000)
  }
}

const onGlobalInputChange = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    performGlobalSearch()
  }, 3000)
}

const onInputChange = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    performSearch()
  }, 3000)
}

const performGlobalSearch = async () => {
  if (!globalQuery.value.trim()) return

  loading.value = true
  results.value = []
  searchPerformed.value = true

  try {
    const tempGlobalQuery = globalQuery.value
    const response = await axios.get('http://localhost:5000/semantic_search', {
      params: {
        query: tempGlobalQuery
      }
    })

    results.value = response.data
  } catch (error) {
    console.error('Error performing search:', error)
  } finally {
    loading.value = false
  }
}

const performSearch = async () => {
  loading.value = true
  results.value = []
  searchPerformed.value = true

  try {
    const tempQuery = query.value
    const response = await axios.get('http://localhost:5000/search', {
      params: {
        query: tempQuery,
        searchBy: searchBy.value,
        year: year.value
      }
    })
    console.log('Search response:', response.data)
    results.value = response.data
    console.log('Results after search:', results.value)
  } catch (error) {
    console.error('Error performing search:', error)
  } finally {
    loading.value = false
  }
}

const toggleSummary = (index: number) => {
  if (expandedIndex.value === index) {
    expandedIndex.value = null
  } else {
    expandedIndex.value = index
  }
}

const fetchYears = async () => {
  try {
    const response = await axios.get('http://localhost:5000/years')
    yearOptions.value = response.data
    console.log('Available years:', yearOptions.value)
  } catch (error) {
    console.error('Error fetching years:', error)
  }
}

const generateDocumentLink = (id: string) => {
  if (route.path.startsWith('/student')) {
    return `/student/information/${id}`
  }
  return `/information/${id}`
}

onMounted(() => {
  fetchYears()
})
</script>

<style scoped>
.search-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.search-page h2 {
  text-align: center;
}

.search-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.global-search-input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.global-search-button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.global-search-button i {
  margin-right: 5px;
}

.browse-projects {
  margin-top: 20px;
  /* border-top: solid whitesmoke; */
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  background-color: white;
  border: none;
  border-bottom: 3px solid transparent;
}

.tabs button.active {
  border-bottom: 3px solid #007bff;
  font-weight: bold;
}

.search-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.search-button i {
  margin-right: 5px;
}

.year-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-results {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.no-results {
  text-align: center;
  font-size: 18px;
}

ul {
  list-style: none;
  padding: 0;
}

.result-item {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ddd;
}
.result-title a {
  text-decoration: none;
  color: inherit;
}

.result-authors,
.result-advisor,
.result-tags {
  font-size: 1em;
  /* color: #666; */
  margin: 5px 0;
}
.expand-summary-button {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
}

.expand-summary-button i {
  margin-right: 5px;
}

.alert-box {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
}
</style>
