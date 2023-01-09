<template>
  <n-space class="user-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Users who applied to a course" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="userCourses" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import { userCourseApi } from '@/api';
import { useRoute } from 'vue-router';

const RemoveButton = userCourse => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'error',
      size: 'small',
      onClick: () => updateApprovalStatus(userCourse.id, false),
    },
    { default: () => 'Remove' },
  );
};

const columns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Date of birth', key: 'dateOfBirth' },
  { title: 'Phone number', key: 'userPhone' },
  { title: 'Remove', key: 'remove', render: RemoveButton },
];

const userCourses = ref([]);
const loading = ref(true);
const route = useRoute();
const courseId = route.params.courseId;

const message = useMessage();

onMounted(async () => {
  const data = await userCourseApi.getAccepted(courseId);
  userCourses.value = data.map(userCourse => ({
    ...userCourse,
    firstName: userCourse.user.firstName,
    lastName: userCourse.user.lastName,
    userPhone: userCourse.user.phone,
    dateOfBirth: userCourse.user.dateOfBirth,
  }));

  loading.value = false;
});

const updateApprovalStatus = async (id, isApproved) => {
  try {
    await userCourseApi.updateStatus({ id, isApproved });
    userCourses.value = userCourses.value.filter(userCourse => userCourse.id !== id);
    message.success('Success');
  } catch (err) {
    message.error(err.response.data.message);
  }
};
</script>

<style scoped>
.user-approval ::v-deep(.n-data-table-th),
.user-approval ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
