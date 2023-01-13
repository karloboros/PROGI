<template>
  <n-h4>Applicants</n-h4>
  <n-skeleton v-if="isLoading" text :repeat="2" />
  <n-data-table v-else :columns="columns" :data="users" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { userCourseApi } from '@/api';

const props = defineProps({
  courseId: { type: Number, required: true },
});

const columns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Phone number', key: 'phone' },
];

const users = ref([]);
const isLoading = ref(true);

const fetchUsers = async () => {
  const data = await userCourseApi.fetchApproved(props.courseId);
  users.value = data.map(({ user }) => user);
  isLoading.value = false;
};

onMounted(async () => {
  await fetchUsers();
});
</script>
