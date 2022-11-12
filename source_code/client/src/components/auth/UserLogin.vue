<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <n-form @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Username" path="username">
      <n-input v-model:value="values.username" placeholder="Username..." autofocus />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input v-model:value="values.password" placeholder="Password..." />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="submit">Login</n-button>
    </n-form-item>
    <n-form-item>
      <n-p>
        Don't have an account?
        <n-a @click="$emit('swap')" quaternary>Click here to register</n-a>
      </n-p>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const initialValues = {
  username: '',
  password: '',
};

const rules = {
  username: {
    required: true,
    message: 'Username is required!',
    trigger: ['input'],
  },
  password: {
    required: true,
    message: 'Password is required!',
    trigger: ['input'],
  },
};

const values = ref(initialValues);

const submit = () => {
  alert('submit');
};
</script>
