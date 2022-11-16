<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Profile" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete account</n-button>
      </template>
      <n-skeleton v-if="loading" text :repeat="6" />
    </n-card>
  </n-space>
</template>

<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { authApi } from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const loading = ref(true);

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
    message.error('Successfully deleted');
    router.push({ name: 'Auth' });
  } catch (err) {
    message.error(err.response.data.message);
  } finally {
    loading.value = false;
  }
};
</script>
