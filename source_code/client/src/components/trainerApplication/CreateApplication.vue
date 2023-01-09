<template>
  <n-space class="create-application" align="center" justify="center" item-style="width: 80%">
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
      <n-form-item label="Motivational letter" path="motivationalLetter">
        <n-input v-model:value="values.motivationalLetter" type="textarea" placeholder="I want to..." />
      </n-form-item>
      <n-form-item label="Certificate" path="certificate">
        <ples-file-upload @update="update" @error="error" accept="application/pdf" />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" attr-type="submit">Send application</n-button>
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script setup>
// eslint-disable-next-line sort-imports
import PlesFileUpload from '@/components/common/PlesFileUpload.vue';
import { ref } from 'vue'; // onMounted,
import { trainerApplicationApi } from '@/api'; //, clubApi, authApi
import { useMessage } from 'naive-ui';
import { validationRules } from '@/utils';

const props = defineProps({
  clubId: {
    type: Number,
    required: true,
  },
});

const initialValues = {
  motivationalLetter: '',
  certificate: '',
};

const { required } = validationRules;
const rules = {
  motivationalLetter: required,
  certificate: required,
};
const message = useMessage();
const values = ref(initialValues);
const formRef = ref(null);

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const { clubId } = props;
        // console.log(props);
        await trainerApplicationApi.apply({ ...values.value, clubId });
        message.success('Sent');
      } catch (err) {
        message.error(err.message);
      }
    }
  });
};

const update = certificate => {
  values.value.certificate = certificate;
};

const error = error => {
  message.error(error);
};

// eslint-disable-next-line no-unused-vars
/* const error = error => {
    message.error(error);
  }; */
</script>
