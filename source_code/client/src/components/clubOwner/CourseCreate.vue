<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="values.name" placeholder="Name..." autofocus />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input v-model:value="values.description" type="textarea" placeholder="Course description..." />
      </n-form-item>
      <n-form-item label="Capacity" path="capacity">
        <n-input-number v-model:value="values.capacity" placeholder="Capacity..." />
      </n-form-item>
      <n-form-item label="Dance" path="dance">
        <n-select v-model:value="values.dance" :options="dances" placeholder="Dance..." />
      </n-form-item>
      <n-form-item label="Address" path="address">
        <n-input v-model:value="values.address" placeholder="Address..." />
      </n-form-item>
      <n-form-item label="Coordinates" path="coordinates">
        <n-input v-model:value="values.coordinates" placeholder="Coordinates..." />
      </n-form-item>
      <n-form-item label="Trainer" path="trainer">
        <n-select v-model:value="values.trainer" :options="trainers" placeholder="Trainer..." />
      </n-form-item>
      <n-form-item label="Minimal age" path="minAge">
        <n-input-number v-model:value="values.minAge" placeholder="Minimal age..." />
      </n-form-item>
      <n-form-item label="Maximal age" path="maxAge">
        <n-input-number v-model:value="values.maxAge" placeholder="Maximal age..." />
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
  </n-space>
</template>

<script setup>
import { authApi, courseApi, danceApi } from '@/api';
import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';
import { Gender } from '@/constants';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { validationRules } from '@/utils';

const emit = defineEmits(['created']);

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      capacity: 0,
      dance: null,
      address: '',
      coordinates: '',
      trainer: null,
      minAge: 0,
      maxAge: 0,
      gender: null,
      applicationDeadline: null,
      additionalRules: '',
    }),
  },
});

const isCreateForm = computed(() => !!props.initialValues.name);

const { required, dateRequired, number, coordinatesRequired } = validationRules;
const rules = {
  name: required,
  description: required,
  capacity: number,
  // dance: required,
  address: required,
  coordinates: coordinatesRequired,
  // trainer: required,
  minAge: number,
  maxAge: number,
  applicationDeadline: dateRequired,
};

const dances = ref([]);
const trainers = ref([]);
const message = useMessage();
const route = useRoute();

onMounted(async () => {
  const dancesData = await danceApi.fetchAll();
  dances.value = dancesData.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const trainersData = await authApi.fetchTrainers();
  trainers.value = trainersData.map(({ id, fullName }) => ({
    value: id,
    label: fullName,
  }));
});

const values = ref(props.initialValues);
const formRef = ref(null);

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        if (route.params.id) {
          await courseApi.edit({ ...values.value, id: route.params.id });
        } else {
          await courseApi.create({ ...values.value, clubId: route.params.clubId });
        }
        message.success('Success');
        emit('created');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};

// eslint-disable-next-line no-unused-vars
/* const error = error => {
  message.error(error);
}; */
</script>
