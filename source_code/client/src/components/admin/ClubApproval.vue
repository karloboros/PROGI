<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Pending clubs" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="clubs" :bordered="false" />
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
const loading = ref(true);

const message = useMessage();

onMounted(async () => {
  const data = await clubApi.fetchPending();
  clubs.value = data.map(club => ({
    ...club,
    ownerName: club.owner.fullName,
    locationName: club.location.name,
  }));

  loading.value = false;
});

const updateApprovalStatus = async (id, approvalStatus) => {
  try {
    await clubApi.updateApprovalStatus({ id, approvalStatus });
    clubs.value = clubs.value.filter(club => club.id !== id);
    message.success('Success');
  } catch (err) {
    message.error(err.response.data.message);
  }
};
</script>

<style scoped>
.club-approval ::v-deep(.n-data-table-th),
.club-approval ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
