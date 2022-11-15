<template>
  <input ref="file" @change="upload" class="d-none" type="file" :accept="props.accept" />
  <n-space align="center">
    <n-button @click="file.click()">Upload</n-button>
    <n-p>{{ fileName }}</n-p>
  </n-space>
</template>

<script setup>
import { authApi } from '@/api';
import { ref } from 'vue';

const emit = defineEmits(['update', 'error']);
const props = defineProps({
  accept: { type: String, default: '' },
});

const file = ref(null);
const fileName = ref(null);

const upload = async () => {
  fileName.value = file.value.files[0].name;
  const formData = new FormData();
  formData.append('file', file.value.files[0]);

  try {
    const { path } = await authApi.upload(formData);
    emit('update', path);
  } catch (err) {
    emit('error', err.response.data.message);
  }
};
</script>

<style scoped>
.d-none {
  display: none;
}
</style>
