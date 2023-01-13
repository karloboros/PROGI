<template>
  <ples-view :title="title" :data="course" class="py-3">
    <template v-if="!isTrainer" #header-extra>
      <n-button @click="apply" :disabled="isAlreadyApplied" type="warning">Apply to this course</n-button>
    </template>
    <n-space vertical>
      <n-image width="100" :src="trainerImage" />
      <ples-calendar :lessons="lessons" class="py-7" />
    </n-space>
  </ples-view>
  <n-space v-if="isTrainer" align="center" justify="center" item-style="width: 80%">
    <n-card title="Users who applied to the course" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="userColumns" :data="users" :bordered="false" />
    </n-card>
  </n-space>
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
const isAlreadyApplied = ref(false);

const message = useMessage();
const router = useRouter();

const authStore = useAuthStore();
const isTrainer = authStore.isTrainer;

const apply = async () => {
  try {
    await userCourseApi.apply(props.courseId);
    isAlreadyApplied.value = true;
    message.success('Successfully applied!');
  } catch (err) {
    message.error(err.response.data.message);
  }
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
  const userCourse = await userCourseApi.fetchByCourseId(props.courseId);
  isAlreadyApplied.value = !!userCourse;
};

const users = ref([]);
const loading = ref(true);
const userColumns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Date of birth', key: 'dateOfBirth' },
  { title: 'Phone number', key: 'userPhone' },
];

const fetchUsers = async () => {
  const data = await userCourseApi.fetchApproved(props.courseId);
  users.value = data.map(userCourse => ({
    ...userCourse,
    firstName: userCourse.user.firstName,
    lastName: userCourse.user.lastName,
    userPhone: userCourse.user.phone,
    dateOfBirth: userCourse.user.dateOfBirth,
  }));
  loading.value = false;
};

onMounted(async () => {
  await fetchCourses();
  await fetchUserCourseStatus();
  if (isTrainer) await fetchUsers();
});
</script>
