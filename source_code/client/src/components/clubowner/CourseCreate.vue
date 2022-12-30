<template>
  <n-card v-if="!isCreateForm" style="width: 80%" title="Create course" size="huge" role="dialog" aria-modal="true">
    <!-- <n-space align="center" justify="center"> -->
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="values.name" placeholder="Name..." autofocus />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input v-model:value="values.description" type="textarea" placeholder="Course description..." />
      </n-form-item>
      <n-form-item label="Capacity" path="capacity">
        <n-input v-model:value="values.capacity" placeholder="Capacity..." />
      </n-form-item>
      <n-form-item label="Dance" path="dance">
        <n-select v-model:value="values.dance" :options="dances" placeholder="Dance..." />
      </n-form-item>
      <n-form-item label="Address" path="address">
        <n-input v-model:value="values.address" placeholder="Address..." />
      </n-form-item>
      <n-form-item label="Minimal age" path="minAge">
        <n-input v-model:value="values.minAge" placeholder="Minimal age..." />
      </n-form-item>
      <n-form-item label="Maximal age" path="maxAge">
        <n-input v-model:value="values.maxAge" placeholder="Maximal age..." />
      </n-form-item>
      <n-form-item label="Gender" path="gender">
        <n-space>
          <n-checkbox-group v-model:value="values.gender">
            <n-checkbox :value="Gender.Male" name="male">Male</n-checkbox>
            <n-checkbox :value="Gender.Female" name="female">Female</n-checkbox>
          </n-checkbox-group>
        </n-space>
      </n-form-item>
      <n-form-item label="Application deadline" path="applicationDeadline">
        <n-date-picker v-model:value="values.applicationDeadline" type="date" />
      </n-form-item>
      <n-form-item label="Additional rules" path="additionalRules">
        <n-input v-model:value="values.additionalRules" type="textarea" placeholder="Additional rules..." />
      </n-form-item>

      <n-form-item v-if="!isCreateForm">
        <n-button type="primary" attr-type="submit">Create course</n-button>
      </n-form-item>
      <n-form-item v-else>
        <n-button type="primary" attr-type="submit">Save changes</n-button>
      </n-form-item>
    </n-form>
    <!-- </n-space> -->
  </n-card>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { courseApi } from '@/api';
import { Gender } from '@/constants';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { validationRules } from '@/utils';

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      capacity: '',
      dance: null, // tu ce biti dropdown lista
      address: '',
      minAge: '',
      maxAge: '',
      gender: null,
      applicationDeadline: null,
      additionalRules: '',
    }),
  },
});

const dances = ['samba', 'valcer'].map(v => ({
  label: v,
  value: v,
}));

const isCreateForm = computed(() => !!props.initialValues.name.length);

const { required, dateRequired, number } = validationRules;
const rules = {
  name: required,
  description: required,
  capacity: number,
  dance: required,
  address: required,
  minAge: number,
  maxAge: number,
  applicationDeadline: dateRequired,
};

const values = ref(props.initialValues);
const formRef = ref(null);

const message = useMessage();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        await courseApi.create({ ...values.value });
        message.success('Success');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
/*
const error = error => {
  message.error(error);
};
*/
</script>
