<template>
  <n-skeleton v-if="isLoading" text :repeat="6" />
  <n-data-table v-else :columns="columns" :data="courses" />
</template>

<script setup>
import { createButton } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  courses: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
});

const DetailsButton = course => {
  const type = 'warning';
  const label = 'Details';
  const onClick = () => router.push({ name: 'Course', params: { id: course.id } });
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'Course', key: 'name' },
  { title: 'Location', key: 'location' },
  { title: 'Details', key: 'details', render: DetailsButton },
];
</script>
