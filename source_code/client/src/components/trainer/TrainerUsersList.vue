<template>
  <n-space class="trainer-users" align="center" justify="center" item-style="width: 80%">
    <n-card title="Users who applied to the course" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="userCourses" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { userCourseApi } from '@/api';
import { useRoute } from 'vue-router';

const columns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Date of birth', key: 'dateOfBirth' },
  { title: 'Phone number', key: 'userPhone' },
];

const userCourses = ref([]);
const loading = ref(true);
const route = useRoute();
const { courseId } = route.params;

onMounted(async () => {
  const data = await userCourseApi.fetchApproved(courseId);
  userCourses.value = data.map(userCourse => ({
    ...userCourse,
    firstName: userCourse.user.firstName,
    lastName: userCourse.user.lastName,
    userPhone: userCourse.user.phone,
    dateOfBirth: userCourse.user.dateOfBirth,
  }));
  loading.value = false;
});
</script>

<style scoped>
.trainer-users ::v-deep(.n-data-table-th),
.trainer-users ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
