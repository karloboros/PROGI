<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules" aria-label="form">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="values.name" placeholder="Name..." autofocus aria-label="name" />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input
          v-model:value="values.description"
          type="textarea"
          placeholder="Course description..."
          aria-label="description"
        />
      </n-form-item>
      <n-form-item label="Capacity" path="capacity">
        <n-input-number v-model:value="values.capacity" placeholder="Capacity..." aria-label="capacity" />
      </n-form-item>
      <n-form-item label="Application deadline" path="applicationDeadline">
        <n-date-picker v-model:value="values.applicationDeadline" type="date" aria-label="applicationDeadline" />
      </n-form-item>
      <n-form-item label="Location name" path="locationName">
        <n-input v-model:value="values.locationName" placeholder="Location name..." aria-label="locationName" />
      </n-form-item>
      <n-form-item label="Coordinates" path="coordinates">
        <n-input v-model:value="values.coordinates" placeholder="Coordinates..." aria-label="coordinates" />
      </n-form-item>
      <n-form-item label="Dance" path="dance">
        <n-select v-model:value="values.danceId" :options="dances" placeholder="Dance..." aria-label="dance" />
      </n-form-item>
      <n-form-item label="Trainer" path="trainer">
        <n-select v-model:value="values.trainerId" :options="trainers" placeholder="Trainer..." aria-label="trainer" />
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
import { clubApi, courseApi, danceApi } from '@/api';
import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';
import { Gender } from '@/constants';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { validationRules } from '@/utils';

const emit = defineEmits(['created']);

const props = defineProps({
  clubId: { type: Number, required: true },
  initialValues: {
    type: Object,
    default: () => ({
      name: null,
      description: '',
      capacity: null,
      applicationDeadline: null,
      locationName: '',
      coordinates: '',
      danceId: null,
      trainerId: null,
      minAge: 0,
      maxAge: 0,
      gender: null,
      additionalRules: null,
    }),
  },
});

const isCreateForm = computed(() => props.clubId);

const { required, dateRequired, number, coordinatesRequired, numberNoTrigger } = validationRules;
const rules = {
  name: required,
  description: required,
  capacity: number,
  applicationDeadline: dateRequired,
  locationName: required,
  coordinates: coordinatesRequired,
  minAge: numberNoTrigger,
  maxAge: numberNoTrigger,
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

  const trainersData = await clubApi.fetchTrainersByClubId(props.clubId);
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
        const method = isCreateForm.value ? courseApi.create : courseApi.edit;
        await method({ ...values.value, clubId: props.clubId }, route.params.id);
        message.success('Success');
        emit('created');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
</script>
