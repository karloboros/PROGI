<template>
  <n-space align="center" justify="center" item-style="width: 80%" class="py-7">
    <n-card title="My schedule" size="huge">
      <trainer-courses :is-loading="isLoading" :courses="courses" />
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

const lessons = ref([]);
const courses = ref([]);
const isLoading = ref(true);

const authStore = useAuthStore();

const mapLessons = (lessonsList, location) => {
  return (lessons.value = lessonsList.map(lesson => ({ ...lesson, location })));
};

onMounted(async () => {
  const data = await courseApi.fetchByTrainerId(authStore.user.id);
  courses.value = data.map(({ location, ...course }) => ({ ...course, location: location.name }));
  lessons.value = data.map(({ lessons, location }) => mapLessons(lessons, location.name)).flat();
  isLoading.value = false;
});
</script>
