<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <img src="@/assets/success-icon.png" alt="Success" class="success-icon" />
      <p class="success-message">Success</p>
      <div class="uploaded-titles">
        <span @click="toggleDetails" class="toggle-details">
          {{ detailsVisible ? 'Hide' : 'Show' }} Details
        </span>
        <ul v-if="detailsVisible" class="details-list">
          <li v-for="(title, index) in titlesArray" :key="index" class="details-item">
            {{ title }}
          </li>
        </ul>
      </div>
      <p class="message-text">{{ message }}</p>
      <!-- Add class for the message text -->
      <button @click="confirmAction" class="confirm-button">OK!</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    titles: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      detailsVisible: false
    }
  },
  computed: {
    titlesArray() {
      return this.titles.split(/,\s*/)
    }
  },
  methods: {
    toggleDetails() {
      this.detailsVisible = !this.detailsVisible
    },
    confirmAction() {
      this.$emit('confirm')
    }
  },
  mounted() {
    console.log('CustomSuccessModal message:', this.message)
  }
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
  max-width: 500px;
  width: 100%;
}

.success-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.success-message {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: green; /* Make the success message green */
}

.uploaded-titles {
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center; /* Center the title */
}

.toggle-details {
  color: #4285f4;
  text-decoration: underline;
  cursor: pointer;
}

.details-list {
  list-style-type: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the list items horizontally */
}

.details-item {
  margin: 5px 0;
  text-align: center; /* Center the text within each list item */
}

.message-text {
  color: green; /* Make the message text green */
}

.confirm-button {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #357ae8;
}
</style>
