<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Course" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete course</n-button>
      </template>
      <course-create v-if="course" :initial-values="course" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { courseApi } from '@/api';
import CourseCreate from '@/components/clubowner/CourseCreate.vue';
import { toDatePicker } from '@/utils';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();

const route = useRoute();
const { id } = route.params;

const course = ref(null);

onMounted(async () => {
  const courseData = await courseApi.fetchById(id);
  console.log(courseData);
  course.value = { ...courseData, applicationDeadline: toDatePicker(courseData.applicationDeadline) };
});

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
    await courseApi.remove(id);
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};
</script>
