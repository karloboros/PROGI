<template>
  <n-space align="center" justify="center">
    <n-modal v-model:show="showModal">
      <course-create @created="showModal = false" />
    </n-modal>
    <n-button @click="showModal = true">Create course</n-button>
    <n-button @click="router.push(showCourses(user.id))">My courses</n-button>
  </n-space>
</template>

<script setup>
import CourseCreate from '@/components/course/CourseCreate.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showModal = ref(false);
const router = useRouter();

const showCourses = id => {
  router.push({
    name: 'Courses',
    params: { id },
  });
};
</script>
