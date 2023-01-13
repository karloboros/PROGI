<template>
  <n-space class="view-users" align="center" justify="center">
    <n-card title="All users" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="users" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { createButton } from '@/utils';
import { userApi } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const EditButton = user => {
  const type = 'warning';
  const label = 'Edit';
  const onClick = () => router.push({ name: 'UserEdit', params: { id: user.id } });
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'Username', key: 'username' },
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Edit', key: 'edit', render: EditButton },
];

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  users.value = await userApi.fetchAll();
  loading.value = false;
});
</script>
