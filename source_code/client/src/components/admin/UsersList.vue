<template>
  <n-space class="view-users" align="center" justify="center">
    <n-card title="All users" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="users" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { authApi } from '@/api';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const editButton = user => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => editUser(user.id),
    },
    { default: () => 'View more' },
  );
};

const editUser = id => {
  router.push({
    name: 'EditUser',
    params: { id },
  });
};

const columns = [
  { title: 'Username', key: 'username' },
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'View more', key: 'edit', render: editButton },
];

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  users.value = await authApi.fetchAll();
  loading.value = false;
});
</script>
