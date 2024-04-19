<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { ref } from 'vue'
import axios from 'axios'

// const dropZoneRef = ref<HTMLDivElement>()
// const input = ref<HTMLInputElement>()

// const onDrop = (files: File[] | null) => {
//   void handleFileChange(files ?? [])
// }
// const onFileChange = async ($event: Event) => {
//   const target = $event.target as HTMLInputElement
//   await handleFileChange(Array.from(target.files ?? []))
// }

// const handleFileChange = async (files: File[]) => {}

const msg = ref("");

const getReponse = async () => {
  try {
    const path = 'http://127.0.0.1:5000/upload';
    const response = await axios.get(path);
    msg.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

</script>

<template>
  <!-- <div ref="dropZoneRef" class="dropZone"></div>
  <div class="container">
    <input
      type="file"
      ref="input"
      multiple
      name="file-upload"
      class="sr-only"
      @change="(e) => onFileChange(e)"
    />
  </div> -->
  
  <div>
    asdsddas
    
  </div>
</template>
