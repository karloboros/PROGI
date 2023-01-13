<template>
  <n-space>
    <n-button @click="router.push({ name: 'Trainer' })" type="warning" text>Home</n-button>
    <n-button @click="router.push({ name: 'Landing' })" type="warning" text>Landing</n-button>
    <n-button @click="router.push({ name: 'CourseList' })" type="warning" text>Courses</n-button>
    <n-button @click="router.push({ name: 'Profile' })" type="warning" text>Profile</n-button>
  </n-space>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
