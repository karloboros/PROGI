<template>
  <ples-modal>
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
      <n-form-item label="Motivational letter" path="motivationalLetter">
        <n-input v-model:value="values.motivationalLetter" type="textarea" placeholder="I want to..." />
      </n-form-item>
      <n-form-item label="Certificate" path="certificate">
        <ples-file-upload
          @update="update"
          @error="error"
          :api="trainerApplicationApi.upload"
          accept="application/pdf"
        />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" attr-type="submit">Send application</n-button>
      </n-form-item>
    </n-form>
  </ples-modal>
</template>

<script setup>
import PlesFileUpload from '@/components/common/PlesFileUpload.vue';
import PlesModal from '@/components/common/PlesModal.vue';
import { ref } from 'vue';
import { trainerApplicationApi } from '@/api';
import { useMessage } from 'naive-ui';
import { validationRules } from '@/utils';

const props = defineProps({
  clubId: { type: Number, required: true },
});

const emit = defineEmits(['applied']);

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
        await trainerApplicationApi.apply({ ...values.value, clubId });
        message.success('Application sent!');
        emit('applied');
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
</script>
