<template>
  <n-card style="width: 80%" title="Edit course" size="huge" role="dialog" aria-modal="true">
    <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete course</n-button>
      </template>
      <course-create :initial-values="course" />
    </n-space>
  </n-card>
</template>

<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { authApi } from '@/api';
import CourseCreate from '@/components/clubowner/CourseCreate.vue';
// import { ref } from 'vue';
// import { toDatePicker } from '@/utils';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();
const dialog = useDialog();

// const course = ref({ ...authStore.course, applicationDeadline: toDatePicker(authStore.course.applicationDeadline) });

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete course. This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await authApi.remove();
    message.success('Successfully deleted');
    await authStore.logout(router);
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};
</script>
