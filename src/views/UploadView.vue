<template>
    <div>
      <h1>File Upload</h1>
      <input type="file" multiple @change="handleFileChange" />
      <button @click="handleUpload">Upload</button>
      <p v-if="uploadStatus">{{ uploadStatus }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'UploadView',
    setup() {
      const selectedFiles = ref<FileList | null>(null);
      const uploadStatus = ref<string>('');
  
      const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        selectedFiles.value = target.files;
      };
  
      const handleUpload = async () => {
        if (!selectedFiles.value) {
          uploadStatus.value = 'No files selected.';
          return;
        }
  
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.value.length; i++) {
          formData.append('file', selectedFiles.value[i]);
        }
  
        try {
          const response = await fetch('http://localhost:5000/upload/test', {
            method: 'POST',
            body: formData,
          });
  
          const text = await response.text();
          try {
            const result = JSON.parse(text);
            if (response.ok) {
              uploadStatus.value = `Upload successful: ${result.message}`;
            } else {
              uploadStatus.value = `Upload failed: ${result.error}`;
            }
          } catch (e) {
            uploadStatus.value = `Upload failed: Invalid JSON response - ${text}`;
          }
        } catch (error) {
          uploadStatus.value = `Upload error: ${error}`;
        }
      };
  
      return {
        selectedFiles,
        uploadStatus,
        handleFileChange,
        handleUpload,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any styles you need for your component here */
  </style>
  