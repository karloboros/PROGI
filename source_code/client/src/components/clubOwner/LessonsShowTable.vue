<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Course lessons" size="huge">
      <n-data-table :columns="columns" :data="lessons" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { format } from 'date-fns';
import { lessonApi } from '@/api';
import { NButton } from 'naive-ui';

const router = useRouter();

const EditButton = lesson => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => viewLessons(lesson.id),
    },
    { default: () => 'Edit lesson' },
  );
};

const columns = [
  { title: 'Lesson', key: 'name' },
  { title: 'Start time', key: 'startTime' },
  { title: 'End time', key: 'endTime' },
  { title: 'Edit lesson', key: 'edit', render: EditButton },
];

const lessons = ref([]);
const route = useRoute();
const courseId = route.params.courseId;

onMounted(async () => {
  const data = await lessonApi.fetchAll(courseId);
  lessons.value = data.map(lesson => ({
    ...lesson,
    name: lesson.course.name,
    startTime: format(new Date(lesson.startTime), 'yyyy-dd-MM hh:mm'),
    endTime: format(new Date(lesson.endTime), 'yyyy-dd-MM hh:mm'),
  }));
});

const viewLessons = id => {
  router.push({
    name: 'LessonEdit',
    params: { id },
  });
};
</script>
