<template>
  <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Username" path="username">
      <n-input v-model:value="values.username" placeholder="Username..." autofocus />
    </n-form-item>
    <n-form-item label="First name" path="firstName">
      <n-input v-model:value="values.firstName" placeholder="First name..." />
    </n-form-item>
    <n-form-item label="Last name" path="lastName">
      <n-input v-model:value="values.lastName" placeholder="Last name..." />
    </n-form-item>
    <n-form-item label="Email" path="email">
      <n-auto-complete
        v-model:value="values.email"
        :input-props="{ autocomplete: 'disabled' }"
        :options="emailOptions"
        placeholder="Email..."
      />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input v-model:value="values.password" type="password" show-password-on="mousedown" placeholder="Password..." />
    </n-form-item>
    <n-form-item label="Gender" path="gender">
      <n-space>
        <n-radio
          @change="values.gender = gender.male"
          :checked="values.gender === gender.male"
          :value="gender.male"
          name="gender"
        >
          Male
        </n-radio>
        <n-radio
          @change="values.gender = gender.female"
          :checked="values.gender === gender.female"
          :value="gender.female"
          name="gender"
        >
          Female
        </n-radio>
      </n-space>
    </n-form-item>
    <n-form-item label="Date of birth" path="dateOfBirth">
      <n-date-picker v-model:value="values.dateOfBirth" type="date" />
    </n-form-item>
    <n-form-item label="Phone number" path="phone">
      <n-input v-model:value="values.phone" placeholder="e.g. 098 234 5678..." />
    </n-form-item>
    <n-form-item label="Dance experience" path="experienceDescription">
      <n-input v-model:value="values.experienceDescription" type="textarea" placeholder="Dance experience..." />
    </n-form-item>
    <n-form-item label="Profile image">
      <input ref="file" @change="upload" class="d-none" type="file" accept="image/png, image/jpeg" />
      <n-space align="center">
        <n-button @click="file.click()">Upload</n-button>
        <n-p>{{ fileName }}</n-p>
      </n-space>
    </n-form-item>

    <n-form-item>
      <n-button attr-type="submit">Register</n-button>
    </n-form-item>
    <n-form-item>
      <n-p>
        Already have an account?
        <n-a @click="$emit('swap')" quaternary>Click here to log in!</n-a>
      </n-p>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { emailSuggestions, gender, validationRules } from '@/utils';
import { authApi } from '@/api';
import { computed } from '@vue/reactivity';
import { defaultRoute } from '@/router';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

const initialValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: gender.male,
  dateOfBirth: null,
  phone: '',
  experienceDescription: '',
};

const { required, emailRequired, dateRequired, phoneRequired } = validationRules;
const rules = {
  username: required,
  firstName: required,
  lastName: required,
  email: emailRequired,
  password: required,
  dateOfBirth: dateRequired,
  phone: phoneRequired,
};

const values = ref(initialValues);
const formRef = ref(null);
const file = ref(null);
const fileName = ref(null);

const emailOptions = computed(() => emailSuggestions(values.value.email));

const message = useMessage();
const router = useRouter();

const upload = async () => {
  fileName.value = file.value.files[0].name;
  const formData = new FormData();
  formData.append('file', file.value.files[0]);

  try {
    const image = await authApi.upload(formData);
    console.log(image);
  } catch (err) {
    message.error(err.response.data.message);
  }
};

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        await authApi.register({ ...values.value });
        router.push(defaultRoute);
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
</script>

<style scoped>
.d-none {
  display: none;
}
</style>
