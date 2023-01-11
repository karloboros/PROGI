<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="My courses" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="courses" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import { NButton } from 'naive-ui';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);

const ShowButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'info',
      size: 'small',
      onClick: () => viewCourseInfo(course.id),
    },
    { default: () => 'View more' },
  );
};

const ShowUsersButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'info',
      size: 'small',
      onClick: () => showUsers(course.id),
    },
    { default: () => 'View students' },
  );
};

const columns = [
  { title: 'Course', key: 'name' },
  { title: 'View more', key: 'show', render: ShowButton },
  { title: 'Student', key: 'student', render: ShowUsersButton },
];

const courses = ref([]);
const trainerId = authStore.user.id;

onMounted(async () => {
  const data = await courseApi.fetchByTrainerId(trainerId);
  courses.value = data.map(course => ({
    ...course,
    name: course.name,
  }));
  loading.value = false;
});

const viewCourseInfo = id => {
  router.push({
    name: 'CourseInfo',
    params: { id },
  });
};

const showUsers = id => {
  router.push({
    name: 'TrainerUsersList',
    params: { courseId: id },
  });
};
</script>
