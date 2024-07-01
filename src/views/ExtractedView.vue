<template>
  <div class="extracted-view">
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
    <button @click="cancelAction" class="cancel-button">Cancel</button>
    <div v-if="isLoading" class="loader"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ExtractedView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const uploadedData = ref(store.getters.getUploadedData);
    const isDropdownOpen = ref<boolean[]>(new Array(uploadedData.value.length).fill(false));
    const isLoading = ref(false);

    const toggleDropdown = (index: number) => {
      isDropdownOpen.value[index] = !isDropdownOpen.value[index];
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
          console.log('Upload successful:', result);
          const titles = uploadedData.value.map(data => data.data.title).join(', ');
          alert(`Upload successful: ${titles}`);
          router.push({ name: 'list-view' });
        } else {
          const error = await response.text();
          console.error('Upload failed:', error);
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const cancelAction = () => {
      if (window.confirm('Are you sure you want to cancel?')) {
        router.push({ name: 'upload-document' });
      }
    };

    return {
      uploadedData,
      isDropdownOpen,
      isLoading,
      toggleDropdown,
      handleSaveAll,
      cancelAction,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.extracted-view {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333333;
  margin-bottom: 20px;
}

.uploaded-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

h3 {
  cursor: pointer;
  font-size: 18px;
  color: #333;
}

.form-section {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.form-label {
  display: block;
  margin-bottom: 10px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-textarea {
  resize: vertical;
  height: 80px;
}

.exists-message {
  color: #d9534f;
}

.save-button, .cancel-button {
  display: block;
  width: 100%;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.save-button {
  background-color: #5cb85c;
}

.save-button:hover {
  background-color: #4cae4c;
}

.save-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #d9534f;
}

.cancel-button:hover {
  background-color: #c9302c;
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
