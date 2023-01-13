<template>
  <n-space>
    <n-button @click="router.push({ name: 'Landing' })" type="warning" text>Landing</n-button>
    <n-button @click="router.push({ name: 'Profile' })" type="warning" text>Profile</n-button>
  </n-space>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
