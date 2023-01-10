<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Lesson" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete lesson</n-button>
      </template>
      <lesson-create v-if="lesson" :initial-values="lesson" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { lessonApi } from '@/api';
import LessonCreate from '@/components/clubowner/LessonCreate.vue';
import { toDatePicker } from '@/utils';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();

const route = useRoute();
const { id } = route.params;

const lesson = ref(null);

onMounted(async () => {
  const lessonData = await lessonApi.fetchById(id);
  console.log(lessonData);
  lesson.value = { startTime: toDatePicker(lessonData.startTime), endTime: toDatePicker(lessonData.endTime) };
});

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete lesson? This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await lessonApi.remove(id);
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};
</script>
