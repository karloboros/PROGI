<template>
  <n-space align="center" justify="center">
    <n-button @click="showModal = true">Create club</n-button>
    <n-modal v-model:show="showModal">
      <club-modal />
    </n-modal>
  </n-space>
</template>

<script setup>
import ClubModal from './ClubModal.vue';
import { ref } from 'vue';

const showModal = ref(false);
</script>
