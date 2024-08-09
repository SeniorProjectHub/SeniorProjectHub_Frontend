<template>
  <div class="search-page">
    <header class="search-header">
      <input
        v-model="globalQuery"
        @input="onGlobalInputChange"
        type="text"
        placeholder="Search by all"
        class="global-search-input"
      />
      <button @click="performGlobalSearch" class="global-search-button">
        <i class="fa fa-search"></i>
      </button>
    </header>
    <div class="browse-projects">
      <h2>Browse Projects</h2>
      <div class="tabs">
        <button :class="{ active: searchBy === 'title' }" @click="searchBy = 'title'">
          By Title
        </button>
        <button :class="{ active: searchBy === 'tags' }" @click="searchBy = 'tags'">By Tag</button>
        <button :class="{ active: searchBy === 'advisor' }" @click="searchBy = 'advisor'">
          By Advisor
        </button>
      </div>
      <div class="search-section">
        <input
          v-model="query"
          @input="onInputChange"
          type="text"
          :placeholder="'Search by ' + searchBy"
          class="search-input"
        />
        <button @click="performSearch" class="search-button">
          <i class="fa fa-search"></i>
        </button>
        <select v-model="year" class="year-select">
          <option v-for="yearOption in yearOptions" :key="yearOption" :value="yearOption">
            {{ yearOption }}
          </option>
        </select>
      </div>
      <div class="search-results">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="results.length === 0" class="no-results">No results found</div>
        <ul v-else>
          <li v-for="(result, index) in results" :key="index" class="result-item">
            <h3 class="result-title">
              <router-link :to="`/information/${result._id}`">{{ result.title }}</router-link>
            </h3>
            <p class="result-authors">Student: {{ result.authors.join(', ') }}</p>
            <p class="result-advisor">Advisor: {{ result.advisor }}</p>
            <p class="result-tags">Tags: {{ result.subject_tags.join(', ') }}</p>
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

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
  }>
>([])
const loading = ref(false)
const searchBy = ref('title')
const year = ref(new Date().getFullYear())
const yearOptions = ref([2023, 2022, 2021, 2020])
const expandedIndex = ref<number | null>(null)

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

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
  // Check if the query is not empty
  if (!globalQuery.value.trim()) return

  // Start the loading indicator
  loading.value = true
  results.value = []

  try {
    // Send a GET request to the Flask backend
    const response = await axios.get('http://localhost:5000/semantic_search', {
      params: {
        query: globalQuery.value
        // Additional parameters can be added here if needed
      }
    })

    // Update the results with the response data
    results.value = response.data
  } catch (error) {
    console.error('Error performing search:', error)
  } finally {
    // Stop the loading indicator
    loading.value = false
  }
}

const performSearch = async () => {
  if (!query.value.trim()) return

  loading.value = true
  results.value = []

  try {
    const response = await axios.get('http://localhost:5000/search', {
      params: {
        query: query.value,
        searchBy: searchBy.value,
        year: year.value
      }
    })
    results.value = response.data
  } catch (error) {
    console.error('Error performing search:', error)
  } finally {
    loading.value = false
  }
}

const toggleSummary = (index: number) => {
  console.log(results.value)
  if (expandedIndex.value === index) {
    expandedIndex.value = null
  } else {
    expandedIndex.value = index
  }
}
</script>

<style scoped>
.search-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.search-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #f0f0f0;
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
  background-color: #f0f0f0;
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
</style>
