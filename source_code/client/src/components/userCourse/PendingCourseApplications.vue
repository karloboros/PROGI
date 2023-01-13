<template>
  <n-space class="user-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Pending applicants" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="userCourses" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { createButton } from '@/utils';
import { useMessage } from 'naive-ui';
import { userCourseApi } from '@/api';

const ApproveButton = userCourse => {
  const type = 'success';
  const label = 'Approve';
  const onClick = () => updateApprovalStatus(userCourse.id, true);
  return createButton({ type, label, onClick });
};

const RejectButton = userCourse => {
  const type = 'error';
  const label = 'Reject';
  const onClick = () => updateApprovalStatus(userCourse.id, false);
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Date of birth', key: 'dateOfBirth' },
  { title: 'Phone number', key: 'userPhone' },
  { title: 'Approve', key: 'approve', render: ApproveButton },
  { title: 'Reject', key: 'reject', render: RejectButton },
];

const userCourses = ref([]);
const loading = ref(true);
const message = useMessage();

const props = defineProps({
  courseId: { type: Number, required: true },
});

onMounted(async () => {
  const data = await userCourseApi.fetchPending(props.courseId);
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
