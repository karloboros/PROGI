<template>
  <n-space class="view-users" align="center" justify="center">
    <n-card title="All clubs" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="clubs" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { createButton } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();

const EditButton = club => {
  const type = 'warning';
  const label = 'Edit';
  const onClick = () => router.push({ name: 'ClubEdit', params: { id: club.id } });
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Phone', key: 'phone' },
  { title: 'Email', key: 'email' },
  { title: 'Description', key: 'description' },
  { title: 'Approval status', key: 'approvalStatus' },
  { title: 'Address', key: 'address' },
  { title: 'Owner', key: 'owner' },
  { title: 'Edit', key: 'edit', render: EditButton },
];

const clubs = ref([]);
const loading = ref(true);

onMounted(async () => {
  const data = await clubApi.fetchAll();
  clubs.value = data.map(club => ({
    ...club,
    address: club.location.name,
    owner: club.owner.fullName,
  }));
  loading.value = false;
});
</script>
