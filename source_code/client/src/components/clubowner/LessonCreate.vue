<template>
  <n-space align="center" justify="center">
    <n-card style="width: 80%" title="Create lesson" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
        <n-form-item label="startTime" path="startTime">
          <n-date-picker v-model:value="values.startTime" type="date" />
        </n-form-item>
        <n-form-item label="endTime" path="endTime">
          <n-date-picker v-model:value="values.endTime" type="date" />
        </n-form-item>

        <n-form-item v-if="!isCreateForm">
          <n-button type="primary" attr-type="submit">Create lesson</n-button>
        </n-form-item>
        <n-form-item v-else>
          <n-button type="primary" attr-type="submit">Save changes</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-space>
</template>

<script setup>
import { authApi } from '@/api';
import { computed } from '@vue/reactivity';
import { defaultRoute } from '@/router';
import { ref } from 'vue';
import { useAuthStore } from '@/store';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { validationRules } from '@/utils';

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      startTime: null,
      endTime: null,
    }),
  },
});

const isCreateForm = computed(() => !!props.initialValues.startTime);

const { dateRequired } = validationRules;
const rules = {
  startTime: dateRequired,
  endTime: dateRequired,
};

const values = ref(props.initialValues);
const formRef = ref(null);

const message = useMessage();
const router = useRouter();
const authStore = useAuthStore();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const method = isCreateForm.value ? authApi.edit : authApi.register;
        const user = await method({ ...values.value });
        authStore.setUser(user);
        if (!isCreateForm.value) router.push(defaultRoute);
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
