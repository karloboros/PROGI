<template>
  <n-space align="center" justify="center" item-style="width: 80%" class="py-7">
    <n-card title="My schedule" size="huge">
      <trainer-courses />
      <n-skeleton v-if="isLoading" text :repeat="2" />
      <ples-calendar v-else :lessons="lessons" class="py-7" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import PlesCalendar from '@/components/common/PlesCalendar.vue';
import TrainerCourses from './TrainerCourses.vue';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const lessons = ref([]);
const isLoading = ref(true);

const fetchLessons = async () => {
  const data = await courseApi.fetchByTrainerId(authStore.user.id);
  if (data) {
    // kako mapirati lessone
  }
  isLoading.value = false;
};

onMounted(async () => {
  await fetchLessons();
});
</script>
