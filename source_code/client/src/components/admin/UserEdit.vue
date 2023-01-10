<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="User profile" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete account</n-button>
      </template>
      <user-register v-if="user" :initial-values="user" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { authApi } from '@/api';
import { toDatePicker } from '@/utils';
import { useAuthStore } from '@/store';
import { useRoute } from 'vue-router';
import UserRegister from '@/components/auth/UserRegister.vue';

const authStore = useAuthStore();
const user = ref(null);
const route = useRoute();
const { id } = route.params;
const message = useMessage();
const dialog = useDialog();

onMounted(async () => {
  user.value = await authApi.fetchById(id);
  user.value = { ...user.value, dateOfBirth: toDatePicker(user.value.dateOfBirth) };
});

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete this account. This is irreversible!',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await authApi.removeById(id);
    if (authStore.user.id === id) await authApi.logout();
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response?.data.message || err);
  }
};
</script>
