<template>
  <ples-list :columns="columns" :data="courses" :loading="isLoading" title="Available courses" class="py-3" />
</template>

<script setup>
import { createButton, formatDate } from '@/utils';
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import PlesList from '@/components/common/PlesList.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  clubId: { type: Number, default: null },
});

const router = useRouter();
const courses = ref([]);
const isLoading = ref(true);

const DetailsButton = course => {
  const type = 'warning';
  const label = 'Details';
  const onClick = () => router.push({ name: 'Course', params: { id: course.id } });
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Capacity', key: 'capacity' },
  { title: 'Application deadline', key: 'applicationDeadline' },
  { title: 'Details', key: 'details', render: DetailsButton },
];

const mapApplicationDeadline = applicationDeadline => {
  const deadline = new Date(applicationDeadline);
  const now = new Date();
  return now < deadline ? formatDate(applicationDeadline) : 'Expired';
};

onMounted(async () => {
  const data = await courseApi.fetchActive();
  const filteredData = data.filter(({ clubId }) => !props.clubId || clubId === props.clubId);
  courses.value = filteredData.map(({ applicationDeadline, ...course }) => ({
    ...course,
    applicationDeadline: mapApplicationDeadline(applicationDeadline),
  }));
  isLoading.value = false;
});
</script>
