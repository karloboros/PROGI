<template>
  <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Club name" path="name">
      <n-input v-model:value="values.name" placeholder="Club name..." />
    </n-form-item>
    <n-form-item label="Location name" path="locationName">
      <n-input v-model:value="values.locationName" placeholder="Location name..." />
    </n-form-item>
    <n-form-item label="Coordinates" path="coordinates">
      <n-input v-model:value="values.coordinates" placeholder="Coordinates (lat, long)..." />
    </n-form-item>
    <n-form-item label="Email" path="email">
      <n-auto-complete
        v-model:value="values.email"
        :input-props="{ autocomplete: 'disabled' }"
        :options="emailOptions"
        placeholder="Email..."
      />
    </n-form-item>
    <n-form-item label="Phone number" path="phone">
      <n-input v-model:value="values.phone" placeholder="e.g. 098 234 5678..." />
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input v-model:value="values.description" type="textarea" placeholder="Description..." />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" attr-type="submit">Save</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { emailSuggestions, validationRules } from '@/utils';
import { clubApi } from '@/api';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

const emit = defineEmits(['saved']);

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      locationName: '',
      coordinates: '',
      email: '',
      phone: '',
      description: '',
    }),
  },
});

const values = ref(props.initialValues);

const { required, coordinatesRequired, emailRequired, phoneRequired } = validationRules;
const rules = {
  name: required,
  locationName: required,
  coordinates: coordinatesRequired,
  email: emailRequired,
  phone: phoneRequired,
};

const formRef = ref(null);
const route = useRoute();

const emailOptions = computed(() => emailSuggestions(values.value.email));
const isCreate = computed(() => route.name === 'Landing');

const message = useMessage();

const submit = async () => {
  const { id } = route.params;
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const method = id ? clubApi.edit : clubApi.create;
        await method({ ...values.value, id });
        if (isCreate.value)
          message.success('Club created successfully! Wait for the admins to review your club to manage it.');
        else message.success('Club saved successfully');
        emit('saved');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
</script>
