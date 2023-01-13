<template>
  <n-space>
    <n-button @click="router.push({ name: 'Landing' })" type="warning" text>Landing</n-button>
    <n-button @click="router.push({ name: 'Profile' })" type="warning" text>Profile</n-button>
    <n-button @click="router.push({ name: 'UsersList' })" type="warning" text>Users</n-button>
    <n-button @click="router.push({ name: 'ClubsList' })" type="warning" text>Clubs</n-button>
    <n-button @click="router.push({ name: 'ClubApproval' })" type="warning" text>Pending clubs</n-button>
    <n-button @click="router.push({ name: 'DancesList' })" type="warning" text>Dances</n-button>
  </n-space>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
