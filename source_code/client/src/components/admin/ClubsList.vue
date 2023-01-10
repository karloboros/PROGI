<template>
  <n-space class="view-users" align="center" justify="center">
    <n-card title="All clubs" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="clubs" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const editButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => editClub(club.id),
    },
    { default: () => 'Edit club' },
  );
};

const editClub = id => {
  router.push({
    name: 'ClubEdit',
    params: { id },
  });
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Phone', key: 'phone' },
  { title: 'Email', key: 'email' },
  { title: 'Description', key: 'description' },
  { title: 'Approval status', key: 'approvalStatus' },
  { title: 'Address', key: 'address' },
  { title: 'Owner', key: 'owner' },
  { title: 'Edit', key: 'edit', render: editButton },
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
