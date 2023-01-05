<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="My courses" size="huge">
      <n-data-table :columns="columns" :data="courses" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { NButton, useDialog, useMessage } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import { courseApi } from '@/api';

const router = useRouter();
const message = useMessage();
const dialog = useDialog();

const EditButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => viewCourseDetails(course.id),
    },
    { default: () => 'Edit course' },
  );
};

const DeleteButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'error',
      size: 'small',
      onClick: () => confirm(course.id),
    },
    { default: () => 'Delete course' },
  );
};

const ShowButton = course => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'info',
      size: 'small',
      onClick: () => viewLessonDetails(course.id),
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
  { title: 'Delete course', key: 'delete', render: DeleteButton },
  { title: 'Show lessons', key: 'show', render: ShowButton },
  { title: 'Add Lesson', key: 'add', render: AddButton },
];

const confirm = id => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete your account. This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: remove(id),
  });
};

const remove = async id => {
  try {
    await courseApi.remove(id);
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};

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

const viewCourseDetails = id => {
  router.push({
    name: 'CourseEdit',
    params: { id },
  });
};
const viewLessonDetails = id => {
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
