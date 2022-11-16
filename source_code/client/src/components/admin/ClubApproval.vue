<template>
  <n-space align="center" justify="center">
    <n-card title="Pending clubs" size="huge">
      <n-data-table :columns="columns" :data="clubs" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { NButton } from 'naive-ui';

const ApproveButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => approve(club),
    },
    { default: () => 'Approve' },
  );
};

const RejectButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'error',
      size: 'small',
      onClick: () => reject(club),
    },
    { default: () => 'Reject' },
  );
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Description', key: 'description' },
  { title: 'Owner', key: 'ownerName' },
  { title: 'Address', key: 'locationName' },
  { title: 'Approve', key: 'approve', render: ApproveButton },
  { title: 'Reject', key: 'reject', render: RejectButton },
];

const clubs = ref([]);

onMounted(async () => {
  const data = await clubApi.fetchPending();
  clubs.value = data.map(club => ({
    ...club,
    ownerName: club.owner.fullName,
    locationName: club.location.name,
  }));
});

const approve = ({ id }) => {
  console.log(id);
};

const reject = ({ id }) => {
  console.log(id);
};
</script>
