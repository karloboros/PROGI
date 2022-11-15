<template>
  <n-space align="center" justify="center">
    <n-card title="Pending clubs" size="huge">
      <n-p v-for="club in clubs" :key="club.name">{{ club.name }}</n-p>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';

const clubs = ref([]);

onMounted(async () => {
  clubs.value = await clubApi.fetchPending();
});
</script>
