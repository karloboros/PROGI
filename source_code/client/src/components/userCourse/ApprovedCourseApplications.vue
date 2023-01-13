<template>
  <n-space class="user-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Accepted applicants" size="huge">
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

const RemoveButton = userCourse => {
  const type = 'error';
  const label = 'Remove';
  const onClick = () => updateApprovalStatus(userCourse.id, false);
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Date of birth', key: 'dateOfBirth' },
  { title: 'Phone number', key: 'userPhone' },
  { title: 'Remove', key: 'remove', render: RemoveButton },
];

const props = defineProps({
  courseId: { type: Number, required: true },
});

const userCourses = ref([]);
const loading = ref(true);
const message = useMessage();

onMounted(async () => {
  const data = await userCourseApi.fetchApproved(props.courseId);
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
