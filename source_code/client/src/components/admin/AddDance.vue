<template>
  <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="values.name" placeholder="Name..." autofocus />
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input v-model:value="values.description" type="textarea" placeholder="Description..." />
    </n-form-item>
    <n-form-item label="Dance image">
      <ples-file-upload @update="update" @error="error" accept="image/png, image/jpeg" />
    </n-form-item>
    <n-form-item label="Video url" path="videoUrl">
      <n-input v-model:value="values.videoUrl" placeholder="Video url..." />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" attr-type="submit">Save</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { danceApi } from '@/api';
import PlesFileUpload from '@/components/common/PlesFileUpload.vue';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { validationRules } from '@/utils';

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      image: '',
      videoUrl: '',
    }),
  },
});

const { required } = validationRules;

const rules = {
  name: required,
  description: required,
  image: required,
  videoUrl: required,
};

const values = ref(props.initialValues);
const formRef = ref(null);
const route = useRoute();
const message = useMessage();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const method = route.params.id ? danceApi.edit : danceApi.create;
        await method({ ...values.value });
        message.success('Dance successfully saved!');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};

const update = image => {
  values.value.image = image;
};

const error = error => {
  message.error(error);
};
</script>
