<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Clubs courses" size="huge">
      <n-data-table :columns="columns" :data="courses" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseApi } from '@/api';
import { NButton } from 'naive-ui';

const router = useRouter();

const EditButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => viewCourses(course.id),
    },
    { default: () => 'Edit course' },
  );
};

const ShowButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'info',
      size: 'small',
      onClick: () => viewLessons(course.id),
    },
    { default: () => 'See lessons' },
  );
};

const AddButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => addLesson(course.id),
    },
    { default: () => 'Add lesson' },
  );
};

const columns = [
  { title: 'Course', key: 'name' },
  { title: 'Edit course', key: 'edit', render: EditButton },
  { title: 'Show lessons', key: 'show', render: ShowButton },
  { title: 'Add Lesson', key: 'add', render: AddButton },
];

const courses = ref([]);
const route = useRoute();
const clubId = route.params.clubId;
console.log(clubId);

onMounted(async () => {
  const data = await courseApi.fetchByClub(clubId);
  courses.value = data.map(course => ({
    ...course,
    name: course.name,
  }));
});

const viewCourses = id => {
  router.push({
    name: 'CourseEdit',
    params: { id },
  });
};

const viewLessons = id => {
  router.push({
    name: 'Lessons',
    params: { id },
  });
};

const addLesson = courseId => {
  router.push({
    name: 'LessonCreate',
    params: { courseId },
  });
};
</script>
