<template>
  <n-space align="center" justify="center">
    <n-card title="Pending clubs" size="huge">
      <n-data-table :columns="columns" :data="clubs" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import { ApprovalStatus } from '@/constants';
import { clubApi } from '@/api';

const ApproveButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => updateApprovalStatus(club.id, ApprovalStatus.Approved),
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
      onClick: () => updateApprovalStatus(club.id, ApprovalStatus.Rejected),
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

const message = useMessage();

onMounted(async () => {
  const data = await clubApi.fetchPending();
  clubs.value = data.map(club => ({
    ...club,
    ownerName: club.owner.fullName,
    locationName: club.location.name,
  }));
});

const updateApprovalStatus = async (id, approvalStatus) => {
  try {
    await clubApi.updateApprovalStatus({ id, approvalStatus });
    clubs.value = clubs.value.filter(club => club.id !== id);
    message.info('Success');
  } catch (err) {
    message.error(err.response.data.message);
  }
};
</script>
