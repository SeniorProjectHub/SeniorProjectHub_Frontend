<template>
  <div>
    <h1>Information List</h1>
    <ul v-if="!error">
      <li v-for="info in informations" :key="info.id">
        <i class="fas fa-file-pdf"></i>
        <span>{{ info.title }}</span>
        <button @click="viewInformation(info.id)">View</button>
      </li>
    </ul>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DocumentCard from '@/components/DocumentCard.vue';
import  { DocumentItem }  from '@/type';

const informations = ref([])
const error = ref(null)
const router = useRouter()

const documents = ref<DocumentItem[0]>([
  {
    id: 59,
    title: 'test1',
    date: 'Monday'
  },
  {
    id: 519,
    title: 'test2',
    date: 'Tuesday'
  }
])


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
.error {
  color: red;
  font-weight: bold;
}

.document {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
