<template>
  <n-space align="center" justify="center" item-style="width: 80%" style="padding: 7% 0">
    <n-card title="Profile" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete account</n-button>
      </template>
      <user-register :initial-values="user" />
    </n-card>
  </n-space>
</template>

<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { authApi } from '@/api';
import { ref } from 'vue';
import { toDatePicker } from '@/utils';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';
import UserRegister from '@/components/auth/UserRegister.vue';

const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();
const dialog = useDialog();

const user = ref({ ...authStore.user, dateOfBirth: toDatePicker(authStore.user.dateOfBirth) });

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete your account. This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await authApi.remove();
    message.success('Successfully deleted');
    await authStore.logout(router);
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};
</script>
