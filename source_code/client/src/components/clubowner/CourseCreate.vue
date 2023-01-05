<template>
  <n-space class="course-adding" align="center" justify="center" item-style="width: 80%">
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
      <n-form-item label="Coordinates" path="coordinates">
        <n-input v-model:value="values.coordinates" placeholder="Coordinates..." />
      </n-form-item>
      <n-form-item label="Trainer" path="trainer">
        <n-select v-model:value="values.trainer" :options="trainers" placeholder="Trainer..." />
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
  </n-space>
</template>

<script setup>
import { Gender } from '@/constants';
// eslint-disable-next-line sort-imports
import { authApi, courseApi, danceApi } from '@/api';
import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';
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
      capacity: '',
      dance: null,
      address: '',
      coordinates: '',
      trainer: null,
      minAge: '',
      maxAge: '',
      gender: null,
      applicationDeadline: null,
      additionalRules: '',
    }),
  },
});

const isCreateForm = computed(() => !!props.initialValues.name);
console.log(isCreateForm.value);
const { required, dateRequired, number, coordinatesRequired } = validationRules;
const rules = {
  name: required,
  description: required,
  capacity: number,
  dance: required,
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
  dances.value = await danceApi.fetchAll();
  console.log(dances.value);
  dances.value = dances.value.map(v => ({
    label: v.name,
    value: v.name,
  }));

  trainers.value = await authApi.fetchTrainers();
  console.log(trainers.value);
  trainers.value = trainers.value.map(t => ({
    label: t.fullname,
    value: t.fullname,
  }));
});

const values = ref(props.initialValues);
const formRef = ref(null);
console.log(route.params.id);
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
