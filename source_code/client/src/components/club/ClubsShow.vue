<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="My courses" size="huge">
      <n-data-table :columns="columns" :data="clubs" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const ShowCoursesButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => viewCourseDetails(club.id),
    },
    { default: () => 'See Courses' },
  );
};
const AddButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => addCourse(club.id),
    },
    { default: () => 'Add course' },
  );
};

const columns = [
  { title: 'Club', key: 'name' },
  { title: 'Show courses', key: 'show', render: ShowCoursesButton },
  { title: 'Add course', key: 'add', render: AddButton },
];

const clubs = ref([]);

onMounted(async () => {
  const data = await clubApi.fetchAll();
  clubs.value = data.map(club => ({
    ...club,
  }));
});

const viewCourseDetails = clubId => {
  router.push({
    name: 'Courses',
    params: { clubId },
  });
};
const addCourse = clubId => {
  router.push({
    name: 'CourseCreate',
    params: { clubId },
  });
};
</script>
