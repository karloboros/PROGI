<template>
  <ples-view :title="title" :data="course" class="py-3">
    <template #header-extra>
      <n-button v-if="shouldDisplayApply" @click="apply" type="warning">Apply to this course</n-button>
    </template>
    <n-space vertical>
      <n-image width="100" :src="trainerImage" />
      <ples-calendar :lessons="lessons" class="py-7" />
    </n-space>
  </ples-view>
</template>

<script setup>
import { courseApi, userCourseApi } from '@/api';
import { onMounted, ref } from 'vue';
import { Gender } from '@/constants';
import PlesCalendar from '@/components/common/PlesCalendar.vue';
import PlesView from '@/components/common/PlesView.vue';
import { useAuthStore } from '@/store';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

const props = defineProps({
  courseId: { type: Number, required: true },
});

const title = ref('');
const course = ref(null);
const trainerImage = ref(null);
const lessons = ref(null);
const canCurrentUserApply = ref(false);
const shouldDisplayApply = ref(false);

const message = useMessage();
const router = useRouter();
const authStore = useAuthStore();

const apply = async () => {
  try {
    await userCourseApi.apply(props.courseId);
    shouldDisplayApply.value = false;
    message.success('Successfully applied!');
  } catch (err) {
    message.error(err.response.data.message);
  }
};

const setCanCurrentUserApply = (minAge, maxAge, gender) => {
  if (authStore.user.gender === gender) return (canCurrentUserApply.value = false);
  const isTopLimit = authStore.userAge < maxAge;
  const isBottomLimit = authStore.userAge > minAge;
  if (minAge && maxAge) return (canCurrentUserApply.value = isTopLimit && isBottomLimit);
  if (!minAge && !maxAge) return (canCurrentUserApply.value = true);
  if (!minAge && maxAge) return (canCurrentUserApply.value = isTopLimit);
  if (minAge && !maxAge) return (canCurrentUserApply.value = isBottomLimit);
};

const fetchCourses = async () => {
  const data = await courseApi.fetchById(props.courseId);
  if (!data) return router.push({ name: 'Home' });
  const {
    name,
    description,
    capacity,
    minAge,
    maxAge,
    gender,
    applicationDeadline,
    additionalRules,
    club,
    dance,
    location,
    trainer,
    lessons: lessonsList,
  } = data;
  title.value = name;
  trainerImage.value = trainer.image;
  lessons.value = lessonsList.map(lesson => ({ ...lesson, location: location.name }));
  setCanCurrentUserApply(minAge, maxAge, gender);
  course.value = [
    { label: 'Description', value: description },
    { label: 'Capacity', value: capacity },
    { label: 'Age group', value: minAge && maxAge ? `${minAge} - ${maxAge}` : null },
    { label: 'Gender', value: Object.keys(Gender)[gender] },
    { label: 'Application deadline', value: new Date(applicationDeadline) },
    { label: 'Additional rules', value: additionalRules },
    { label: 'Club', value: club.name },
    { label: 'Dance', value: dance.name },
    { label: 'Location', value: location.name },
    { label: 'Trainer', value: trainer.fullName },
  ];
};

const fetchUserCourseStatus = async () => {
  if (!canCurrentUserApply.value) return;
  const userCourse = await userCourseApi.fetchByCourseId(props.courseId);
  shouldDisplayApply.value = !userCourse;
};

onMounted(async () => {
  await fetchCourses();
  await fetchUserCourseStatus();
});
</script>
