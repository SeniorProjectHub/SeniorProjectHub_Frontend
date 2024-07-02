<template>
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <!-- <button @click="closeModal" class="close-button">&times;</button> -->
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="modal-button">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ErrorModal',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: 'Error',
      },
      message: {
        type: String,
        required: true,
      },
    },
    emits: ['close'],
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-body {
    margin-top: 10px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .modal-button {
    background: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .modal-button:hover {
    background: #c9302c;
  }
  </style>
  