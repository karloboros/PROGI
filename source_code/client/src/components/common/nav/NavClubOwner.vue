<template>
  <n-space>
    <n-button @click="router.push({ name: 'CourseList', params: { id: clubId } })" type="warning" text>
      Courses
    </n-button>
    <n-button @click="router.push({ name: 'TrainerApplications', params: { id: clubId } })" type="warning" text>
      Trainer applications
    </n-button>
    <n-button @click="router.push({ name: 'Profile' })" type="warning" text>Profile</n-button>
    <n-button @click="router.push({ name: 'EventsList' })" type="warning" text>Events</n-button>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { useRouter } from 'vue-router';

const clubId = ref(null);
const router = useRouter();

onMounted(async () => {
  const club = await clubApi.fetchByOwner();
  clubId.value = club.id;
});
</script>
