<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="values.name" placeholder="Name..." autofocus />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input v-model:value="values.description" type="textarea" placeholder="Description..." />
      </n-form-item>
      <n-form-item label="Dance image" path="image">
        <ples-file-upload @update="update" @error="error" accept="image/png, image/jpeg" :api="danceapi" />
      </n-form-item>
      <n-form-item label="Video url" path="videoUrl">
        <n-input v-model:value="values.videoUrl" placeholder="Video url..." />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" attr-type="submit">Save</n-button>
      </n-form-item>
    </n-form>
  </n-space>
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

const danceapi = danceApi.upload;
const { required, urlRequired } = validationRules;

const rules = {
  name: required,
  description: required,
  videoUrl: urlRequired,
  image: required,
};

const values = ref(props.initialValues);
const formRef = ref(null);
const route = useRoute();
const message = useMessage();

const submit = async () => {
  const { id } = route.params;
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        if (id) await danceApi.edit({ ...values.value, id });
        else await danceApi.create({ ...values.value });
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
