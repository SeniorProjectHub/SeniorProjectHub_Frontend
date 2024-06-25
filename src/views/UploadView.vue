<template>
  <div class="upload-wrapper">
    <div 
      class="upload-container" 
      @dragover.prevent 
      @dragenter.prevent 
      @drop="handleDrop"
      @dragover="highlight"
      @dragleave="unhighlight"
      @dragenter="highlight"
    >
      <h2>Upload Senior Project PDF Files</h2>
      <input type="file" multiple @change="handleFileChange" class="file-input" />
      <button @click="triggerFileInput" class="select-button">Select PDF files</button>
      <p>or drop PDF files here</p>
      <div v-if="selectedFiles && selectedFiles.length > 0" class="file-list">
        <h3>Selected Files:</h3>
        <ul>
          <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
        </ul>
      </div>
      <button @click="handleUpload" class="upload-button" :disabled="isLoading || !selectedFiles || selectedFiles.length === 0">Upload</button>
      <div v-if="uploadStatus" class="status-message">{{ uploadStatus }}</div>
      <div v-if="isLoading" class="loader"></div>
      <div v-if="uploadedData && uploadedData.length > 0">
        <h2>Uploaded Data</h2>
        <div v-for="(data, index) in uploadedData" :key="index" class="uploaded-item">
          <h3 @click="toggleDropdown(index)">
            File: {{ data.filename }} 
            <span :class="{'dropdown-icon': true, 'open': isDropdownOpen[index]}">&#9660;</span>
          </h3>
          <div v-show="isDropdownOpen[index]" class="form-section">
            <div v-if="data.status === 'uploaded'">
              <label class="form-label">
                Title:
                <input type="text" v-model="data.data.title" class="form-input" />
              </label>
              <label class="form-label">
                Authors:
                <input type="text" v-model="data.data.authors" class="form-input" />
              </label>
              <label class="form-label">
                Advisor:
                <input type="text" v-model="data.data.advisor" class="form-input" />
              </label>
              <label class="form-label">
                Subject Tags:
                <input type="text" v-model="data.data.subject_tags" class="form-input" />
              </label>
              <label class="form-label">
                Summary:
                <textarea v-model="data.data.summary" class="form-textarea"></textarea>
              </label>
            </div>
            <div v-else-if="data.status === 'exists'" class="exists-message">
              <p>This file already exists in the database.</p>
            </div>
          </div>
        </div>
        <button @click="handleSaveAll" class="save-button" :disabled="isLoading">Save All</button>
        <div v-if="isLoading" class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'UploadView',
  setup() {
    const selectedFiles = ref<FileList | null>(null);
    const uploadStatus = ref<string>('');
    const uploadedData = ref<object[]>([]);
    const isLoading = ref<boolean>(false);
    const isDropdownOpen = ref<boolean[]>([]);
    const router = useRouter();

    const triggerFileInput = () => {
      const fileInput = document.querySelector('.file-input') as HTMLInputElement;
      fileInput.click();
    };

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      selectedFiles.value = target.files;
    };

    const handleDrop = (event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (files) {
        selectedFiles.value = files;
      }
    };

    const handleUpload = async () => {
      if (!selectedFiles.value) {
        uploadStatus.value = 'No files selected.';
        return;
      }

      isLoading.value = true;
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.value.length; i++) {
        formData.append('file', selectedFiles.value[i]);
      }

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        const text = await response.text();
        try {
          const result = JSON.parse(text);
          if (response.ok) {
            uploadStatus.value = 'Upload completed';
            uploadedData.value = result;
            isDropdownOpen.value = new Array(result.length).fill(false); // Initialize dropdown state
          } else {
            uploadStatus.value = `Upload failed: ${result.error}`;
          }
        } catch (e) {
          uploadStatus.value = `Upload failed: Invalid JSON response - ${text}`;
        }
      } catch (error) {
        uploadStatus.value = `Upload error: ${error}`;
      } finally {
        isLoading.value = false;
      }
    };

    const handleSaveAll = async () => {
      isLoading.value = true;
      try {
        const response = await fetch('http://localhost:5000/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadedData.value),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Save successful:', result);
          router.push('/list-view'); // Redirect to list-view
        } else {
          const error = await response.text();
          console.error('Save failed:', error);
        }
      } catch (error) {
        console.error('Save error:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const toggleDropdown = (index: number) => {
      isDropdownOpen.value[index] = !isDropdownOpen.value[index];
    };

    const highlight = (event: Event) => {
      const uploadContainer = event.currentTarget as HTMLElement;
      uploadContainer.classList.add('highlight');
    };

    const unhighlight = (event: Event) => {
      const uploadContainer = event.currentTarget as HTMLElement;
      uploadContainer.classList.remove('highlight');
    };

    return {
      selectedFiles,
      uploadStatus,
      uploadedData,
      isLoading,
      isDropdownOpen,
      handleFileChange,
      handleDrop,
      handleUpload,
      handleSaveAll,
      toggleDropdown,
      triggerFileInput,
      highlight,
      unhighlight,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.upload-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.upload-container {
  max-width: 600px;
  font-family: 'Inter', sans-serif;
  width: 100%;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  text-align: center;
  border: 2px dashed transparent;
  transition: border-color 0.3s;
}

.upload-container.highlight {
  border-color: #007BFF;
}

h2 {
  color: #333333;
  margin-bottom: 20px;
}

.file-list {
  text-align: left;
  margin-bottom: 20px;
}

.file-list h3 {
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.file-list ul {
  list-style: none;
  padding: 0;
}

.file-list li {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 14px;
}

.select-button,
.upload-button {
  background-color: #d9534f;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 0;
}

.select-button:hover,
.upload-button:hover {
  background-color: #c9302c;
}

.select-button:disabled,
.upload-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.file-input {
  display: none;
}

.status-message {
  color: #d9534f;
  margin-top: 20px;
}

p {
  margin: 10px 0;
  color: #666666;
}

.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.dropdown-icon {
  font-size: 0.8em;
  margin-left: 10px;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}
</style>
