<template>
  <n-space class="trainer-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="Pending trainers" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="trainerApplications" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import { trainerApplicationApi } from '@/api';
import { useRoute } from 'vue-router';

const ApproveButton = trainerApplication => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => updateApprovalStatus(trainerApplication.id, true),
    },
    { default: () => 'Approve' },
  );
};

const RejectButton = trainerApplication => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'error',
      size: 'small',
      onClick: () => updateApprovalStatus(trainerApplication.id, false),
    },
    { default: () => 'Reject' },
  );
};

const CertificateButton = trainerApplication => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'secondary',
      size: 'small',
      onClick: () => window.open(trainerApplication.certificate),
    },
    { default: () => 'Download certificate' },
  );
};

const columns = [
  { title: 'First name', key: 'firstName' },
  { title: 'Last name', key: 'lastName' },
  { title: 'Date of birth', key: 'dateOfBirth' },
  { title: 'Phone number', key: 'trainerPhone' },
  { title: 'Motivational letter', key: 'motivationalLetter' },
  { title: 'Certificate', key: 'certificate', render: CertificateButton },
  { title: 'Approve', key: 'approve', render: ApproveButton },
  { title: 'Reject', key: 'reject', render: RejectButton },
];

const trainerApplications = ref([]);
const loading = ref(true);
const route = useRoute();
const clubId = route.params.clubId;

const message = useMessage();

onMounted(async () => {
  const data = await trainerApplicationApi.fetchPending(clubId);
  trainerApplications.value = data.map(trainerApplication => ({
    ...trainerApplication,
    firstName: trainerApplication.trainer.firstName,
    lastName: trainerApplication.trainer.lastName,
    trainerPhone: trainerApplication.trainer.phone,
    dateOfBirth: trainerApplication.trainer.dateOfBirth,
  }));

  loading.value = false;
});

const updateApprovalStatus = async (id, isApproved) => {
  try {
    await trainerApplicationApi.updateStatus({ id, isApproved });
    trainerApplications.value = trainerApplications.value.filter(trainerapplication => trainerapplication.id !== id);
    message.success('Success');
  } catch (err) {
    message.error(err.response.data.message);
  }
};
</script>

<style scoped>
.trainer-approval ::v-deep(.n-data-table-th),
.trainer-approval ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
