<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="My courses" size="huge">
      <n-data-table :columns="columns" :data="courses" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
// import { h, onMounted, ref } from 'vue';
import { h, onMounted, ref } from 'vue';
import { NButton, useDialog, useMessage } from 'naive-ui';
import { courseApi } from '@/api';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
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
      onClick: () => confirm,
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
      onClick: () => router.push({ name: 'LessonCreate' }),
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

const courses = [{ name: 'Tecaj sambe' }, { name: 'Tecaj valcera' }];

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete your account. This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await courseApi.remove();
    message.success('Successfully deleted');
    await authStore.logout(router);
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};

// const courses = ref([]);
const loading = ref(true);

onMounted(async () => {
  const data = await courseApi.fetchAll();
  courses.value = data.map(course => ({
    ...course,
    name: course.name,
  }));

  loading.value = false;
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
</script>
