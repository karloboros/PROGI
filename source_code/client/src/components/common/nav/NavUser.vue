<template>
  <n-space>
    <n-button @click="router.push({ name: 'Home' })" type="warning" text>Home</n-button>
    <n-button @click="router.push({ name: 'Landing' })" type="warning" text>Landing</n-button>
    <n-button @click="router.push({ name: 'Profile' })" type="warning" text>Profile</n-button>
    <n-button @click="router.push({ name: 'CourseList' })" type="warning" text>Courses</n-button>
    <n-button v-if="isLandingRoute" @click="navigationStore.toggleShowClubCreateModal()" type="primary" text>
      Create a club
    </n-button>
  </n-space>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useNavigationStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const navigationStore = useNavigationStore();

const isLandingRoute = computed(() => router.currentRoute.value.name === 'Landing');
</script>
