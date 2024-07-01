<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <p>Are you sure you want to Delete this document?</p>
      <div class="button-container">
        <button class="delete-button" @click="onDelete">Delete</button>
        <button class="cancel-button" @click="onCancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['delete', 'cancel'])

const onDelete = () => {
  emit('delete')
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 5px; /* Reduce gap to make buttons closer */
  margin-top: 20px;
}

.delete-button {
  background-color: #e53935;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c62828;
}

.cancel-button:hover {
  background-color: #2563eb;
}
</style>
