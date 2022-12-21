<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card style="width: 80%" title="Create event" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
        <n-form-item label="Event name" path="name">
          <n-input v-model:value="values.name" placeholder="Event name..." />
        </n-form-item>
        <n-form-item label="Description" path="description">
          <n-input v-model:value="values.description" type="textarea" placeholder="Description..." />
        </n-form-item>
        <n-form-item label="Event image" path="image">
          <ples-file-upload @update="update" @error="error" accept="image/png, image/jpeg" />
        </n-form-item>
        <n-form-item label="Club" path="club">
          <n-input v-model:value="values.club" placeholder="Club..." />
        </n-form-item>
        <n-form-item label="Address" path="address">
          <n-input v-model:value="values.address" placeholder="Address..." />
        </n-form-item>
        <n-form-item label="Dance" path="dance">
          <n-input v-model:value="values.dance" placeholder="Dance..." />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" attr-type="submit">Create</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-space>
</template>

<script setup>
import { eventApi } from '@/api';
import PlesFileUpload from '@/components/common/PlesFileUpload.vue';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { validationRules } from '@/utils';

const emit = defineEmits(['created']);

const initialValues = {
  name: '',
  address: '',
  description: '',
  club: '',
  image: '',
  dance: '',
};

const { required } = validationRules;
const rules = {
  name: required,
  address: required,
  description: required,
  club: required,
  dance: required,
};

const values = ref(initialValues);
const formRef = ref(null);

const message = useMessage();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        await eventApi.create({ ...values.value });
        message.success('Event successfully created!');
        emit('created');
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
