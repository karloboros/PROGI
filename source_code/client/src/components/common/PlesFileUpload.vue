<template>
  <n-space vertical size="large">
    <input ref="file" @change="upload" class="d-none" type="file" :accept="props.accept" />
    <n-space align="center">
      <n-button @click="file.click()">Upload</n-button>
      <n-text :type="fileTypeColor">{{ fileName }}</n-text>
    </n-space>
    <n-image width="100" :src="filePath" />
  </n-space>
</template>

<script setup>
import { authApi } from '@/api';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const emit = defineEmits(['update', 'error']);
const props = defineProps({
  accept: { type: String, default: '' },
  api: { type: Function, default: authApi.upload },
});

const file = ref(null);
const fileName = ref(null);
const filePath = ref(null);
const error = ref(false);
const isLoading = ref(false);

const fileTypeColor = computed(() => (error.value && !isLoading.value ? 'error' : ''));

const upload = async () => {
  isLoading.value = true;
  error.value = false;

  fileName.value = file.value.files[0].name;
  const formData = new FormData();
  formData.append('file', file.value.files[0]);

  try {
    const { path } = await props.api(formData);
    filePath.value = path;
    emit('update', path);
  } catch (err) {
    error.value = true;
    emit('error', err.response.data.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
