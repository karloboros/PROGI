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
    <n-form-item v-if="!isProfileForm" label="Password" path="password">
      <n-input v-model:value="values.password" type="password" show-password-on="mousedown" placeholder="Password..." />
    </n-form-item>
    <n-form-item label="Gender" path="gender">
      <n-space>
        <n-radio
          @change="values.gender = Gender.Male"
          :checked="values.gender === Gender.Male"
          :value="Gender.Male"
          name="gender"
        >
          Male
        </n-radio>
        <n-radio
          @change="values.gender = Gender.Female"
          :checked="values.gender === Gender.Female"
          :value="Gender.Female"
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
      <ples-file-upload @update="update" @error="error" accept="image/png, image/jpeg" />
    </n-form-item>

    <n-form-item v-if="!isProfileForm">
      <n-button attr-type="submit">Register</n-button>
    </n-form-item>
    <n-form-item v-else>
      <n-button attr-type="submit">Save changes</n-button>
    </n-form-item>
    <n-form-item v-if="!isProfileForm">
      <n-p>
        Already have an account?
        <n-a @click="$emit('swap')" quaternary>Click here to log in!</n-a>
      </n-p>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { emailSuggestions, validationRules } from '@/utils';
import { authApi } from '@/api';
import { computed } from '@vue/reactivity';
import { defaultRoute } from '@/router';
import { Gender } from '@/constants';
import PlesFileUpload from '@/components/common/PlesFileUpload.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/store';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: Gender.Male,
      dateOfBirth: null,
      phone: '',
      experienceDescription: '',
      image: '',
    }),
  },
});

const isProfileForm = computed(() => !!props.initialValues.username.length);

const { required, emailRequired, dateRequired, dateOfBirth, phoneRequired } = validationRules;
const rules = {
  username: required,
  firstName: required,
  lastName: required,
  email: emailRequired,
  password: required,
  dateOfBirth: [dateRequired, dateOfBirth],
  phone: phoneRequired,
};

const values = ref(props.initialValues);
const formRef = ref(null);

const emailOptions = computed(() => emailSuggestions(values.value.email));

const message = useMessage();
const router = useRouter();
const authStore = useAuthStore();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const method = isProfileForm.value ? authApi.edit : authApi.register;
        const user = await method({ ...values.value });
        authStore.setUser(user);
        router.push(defaultRoute);
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};

const update = image => {
  values.value.image = image;
};

const error = error => {
  message.error(error);
};
</script>
