<template>
  <!-- <n-card style="width: 80%" title="Edit course" size="huge" role="dialog" aria-modal="true"> -->
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <template #header-extra>
      <n-button @click="confirm" type="error">Delete course</n-button>
    </template>
    <course-create :initial-values="course" />
  </n-space>
  <!-- </n-card> -->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { courseApi } from '@/api';
import CourseCreate from '@/components/clubowner/CourseCreate.vue';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();

const route = useRoute();
const id = route.params.id;

const course = ref([]);

onMounted(async () => {
  const data = await courseApi.fetchById(id);
  course.value = {
    name: data.name,
    description: data.description,
    capacity: data.capacity,
    dance: data.dance,
    address: data.address,
    coordinates: data.coordinates,
    trainer: data.trainer,
    minAge: data.minAge,
    maxAge: data.maxAge,
    gender: data.gender,
    applicationDeadline: data.applicationDeadline,
    additionalRules: data.additionalRules,
  };
  console.log(course.value);
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
