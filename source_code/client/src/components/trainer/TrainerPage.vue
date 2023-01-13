<template>
  <n-space align="center" justify="center" item-style="width: 80%" class="py-7">
    <n-skeleton v-if="loading" text :repeat="6" />
    <n-space v-else vertical>
      <ples-calendar :lessons="lessons" class="py-7" />
    </n-space>
    <trainer-courses-list />
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import PlesCalendar from '@/components/common/PlesCalendar.vue';
import TrainerCoursesList from './TrainerCoursesList.vue';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const lessons = ref([]);
const loading = ref(true);

const fetchLessons = async () => {
  const data = await courseApi.fetchByTrainerId(authStore.user.id);
  if (data) {
    // kako mapirati lessone
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchLessons();
});
</script>
