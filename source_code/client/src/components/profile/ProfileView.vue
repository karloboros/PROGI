<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Profile" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete account</n-button>
      </template>
    </n-card>
  </n-space>
</template>

<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { authApi } from '@/api';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();
const dialog = useDialog();

const confirm = () => {
  dialog.warning({
    title: 'Confirm',
    content: 'Are you sure? you want to delete your account. This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await authApi.remove();
    message.info('Successfully deleted');
    await authStore.logout(router);
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};
</script>
