<template>
  <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Username" path="username">
      <n-input v-model:value="values.username" placeholder="Username..." autofocus />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input v-model:value="values.password" type="password" show-password-on="mousedown" placeholder="Password..." />
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
import { authApi } from '@/api';
import { defaultRoute } from '@/router';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import validationRules from '@/utils/rules';

const initialValues = {
  username: '',
  password: '',
};

const { required } = validationRules;
const rules = {
  username: required,
  password: required,
};

const values = ref(initialValues);
const formRef = ref(null);

const message = useMessage();
const router = useRouter();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        await authApi.login({ ...values.value });
        router.push(defaultRoute);
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
</script>
