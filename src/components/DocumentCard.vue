<template>
  <div class="document">
    <div class="document-card">
      <span>@{{ document.date }}</span>
      <h4>{{ document.title }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { DocumentItem } from '@/type'
const props = defineProps({
  document: {
    type: Object as PropType<DocumentItem>,
    require: true
  }
})
</script>

<style scoped>
.document-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.document-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
