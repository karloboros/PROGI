<template>
  <n-space align="center" justify="center">
    <n-modal v-model:show="showModal">
      <club-modal @created="showModal = false" />
    </n-modal>
    <n-button @click="showModal = true">Create club</n-button>
    <n-button @click="router.push({ name: 'Profile' })">Profile</n-button>
    <n-button @click="authStore.logout(router)">Logout</n-button>
    <courses-map></courses-map>
  </n-space>
</template>

<script setup>
import ClubModal from './ClubModal.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const showModal = ref(false);
</script>
