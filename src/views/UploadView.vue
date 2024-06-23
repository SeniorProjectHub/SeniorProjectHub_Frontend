<template>
  <div class="upload-container">
    <h1>File Upload</h1>
    <input type="file" multiple @change="handleFileChange" class="file-input" />
    <button @click="handleUpload" class="upload-button" :disabled="isLoading">Upload</button>
    <p v-if="uploadStatus" class="status-message">{{ uploadStatus }}</p>
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

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      selectedFiles.value = target.files;
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

    return {
      selectedFiles,
      uploadStatus,
      uploadedData,
      isLoading,
      isDropdownOpen,
      handleFileChange,
      handleUpload,
      handleSaveAll,
      toggleDropdown,
    };
  },
});
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  color: #333;
}

.file-input {
  display: block;
  margin: 20px auto;
  padding: 10px;
  font-size: 16px;
}

.upload-button {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 20px auto;
  padding: 10px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.status-message {
  text-align: center;
  color: #d9534f;
}

.uploaded-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-section {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #007BFF;
}

.form-textarea {
  height: 100px;
}

.exists-message {
  color: #d9534f;
}

.save-button {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 20px auto;
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.save-button:hover:not(:disabled) {
  background-color: #218838;
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
