<template>
  <ples-list :columns="columns" :data="courses" :loading="isLoading" title="Available courses" class="py-3">
    <template #header-extra>
      <n-button @click="showCourseCreateModal = true" type="warning">Create course</n-button>
    </template>
  </ples-list>
  <n-modal v-model:show="showCourseCreateModal">
    <ples-modal class="py-3">
      <course-create @created="showCourseCreateModal = false" :club-id="clubId" />
    </ples-modal>
  </n-modal>
  <n-modal v-model:show="showLessonCreateModal">
    <ples-modal class="py-3">
      <lesson-create @saved="showLessonCreateModal = false" :course-id="courseId" />
    </ples-modal>
  </n-modal>
</template>

<script setup>
import { createButton, formatDate } from '@/utils';
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import CourseCreate from './CourseCreate.vue';
import LessonCreate from './LessonCreate.vue';
import PlesList from '@/components/common/PlesList.vue';
import PlesModal from '@/components/common/PlesModal.vue';

import { useRouter } from 'vue-router';

const props = defineProps({
  clubId: { type: Number, default: null },
});

const router = useRouter();
const courses = ref([]);
const isLoading = ref(true);
const showCourseCreateModal = ref(false);
const showLessonCreateModal = ref(false);
const courseId = ref(null);

const DetailsButton = course => {
  const type = 'warning';
  const label = 'Details';
  const onClick = () => router.push({ name: 'Course', params: { id: course.id } });
  return createButton({ type, label, onClick });
};

const AddLessonButton = course => {
  const type = 'warning';
  const label = 'Add lesson';
  const onClick = () => {
    showLessonCreateModal.value = true;
    courseId.value = course.id;
  };
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Capacity', key: 'capacity' },
  { title: 'Application deadline', key: 'applicationDeadline' },
  { title: '', key: 'details', render: DetailsButton },
  { title: '', key: 'lesson', render: AddLessonButton },
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
