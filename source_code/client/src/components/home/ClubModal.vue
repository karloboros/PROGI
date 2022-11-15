<template>
  <n-card style="width: 50%" title="Create club" size="huge" role="dialog" aria-modal="true">
    <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
      <n-form-item label="Club name" path="name">
        <n-input v-model:value="values.name" placeholder="Club name..." />
      </n-form-item>
      <n-form-item label="Address" path="address">
        <n-input v-model:value="values.address" placeholder="Address..." />
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
        <n-button attr-type="submit">Create</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup>
import { emailSuggestions, validationRules } from '@/utils';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const initialValues = {
  name: '',
  address: '',
  email: '',
  phone: '',
  description: '',
};

const { required, emailRequired, phoneRequired } = validationRules;
const rules = {
  name: required,
  address: required,
  email: emailRequired,
  phone: phoneRequired,
};

const values = ref(initialValues);
const formRef = ref(null);

const emailOptions = computed(() => emailSuggestions(values.value.email));
</script>
