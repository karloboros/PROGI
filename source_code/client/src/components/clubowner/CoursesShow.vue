<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="My courses" size="huge">
      <n-data-table :columns="columns" :data="courses" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
// import { h, onMounted, ref } from 'vue';
// import { courseApi } from '@/api';
import { h } from 'vue';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

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
  { title: 'Add Lesson', key: 'add', render: AddButton },
];

const courses = [{ name: 'Tecaj sambe' }, { name: 'Tecaj valcera' }];
/*
const courses = ref([]);
const loading = ref(true);

onMounted(async () => {
  const data = await courseApi.fetchPending();
  courses.value = data.map(course => ({
    ...course,
    name: course.name,
  }));

  loading.value = false;
});
*/
</script>
