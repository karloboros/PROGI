<template>
  <input ref="file" @change="upload" class="d-none" type="file" :accept="props.accept" />
  <n-space align="center">
    <n-button @click="file.click()">Upload</n-button>
    <n-p>{{ fileName }}</n-p>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['upload']);
const props = defineProps({
  accept: { type: String, default: '' },
});

const file = ref(null);
const fileName = ref(null);

const upload = async () => {
  fileName.value = file.value.files[0].name;
  const formData = new FormData();
  formData.append('file', file.value.files[0]);

  emit('upload', formData);
};
</script>

<style scoped>
.d-none {
  display: none;
}
</style>
