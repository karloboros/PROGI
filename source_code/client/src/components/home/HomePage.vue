<template>
  <n-space align="center" justify="center">
    <n-modal v-model:show="showModal">
      <club-modal @created="showModal = false" />
    </n-modal>
    <n-button @click="showModal = true">Create club</n-button>
    <n-button @click="router.push({ name: 'Profile' })">Profile</n-button>
    <n-form-item v-if="isClubOwner">
      <n-button @click="router.push({ name: 'EventAdd' })">Create event</n-button>
    </n-form-item>
    <n-button @click="authStore.logout(router)">Logout</n-button>
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
const isClubOwner = authStore.isClubOwner;
</script>
