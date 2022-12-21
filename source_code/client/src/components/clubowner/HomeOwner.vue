<template>
  <n-space align="center" justify="center">
    <n-modal v-model:show="showModal">
      <course-create @created="showModal = false" />
    </n-modal>
    <n-modal v-model:show="showModal2">
      <course-edit @created="showModal2 = false" />
    </n-modal>
    <n-modal v-model:show="showModal2">
      <courses-show @created="showModal3 = false" />
    </n-modal>
    <n-button @click="showModal = true">Create course</n-button>
    <n-button @click="showModal2 = true">Edit course</n-button>
    <n-button @click="router.push({ name: 'Courses' })">My courses</n-button>
  </n-space>
</template>

<script setup>
import CourseCreate from './CourseCreate.vue';
import CourseEdit from './CourseEdit.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showModal = ref(false);
const showModal2 = ref(false);
const router = useRouter();
</script>
