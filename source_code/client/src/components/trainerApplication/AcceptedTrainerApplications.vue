<template>
    <n-space class="trainer-approval" align="center" justify="center" item-style="width: 80%">
      <n-card title="Trainers for this club" size="huge">
        <n-skeleton v-if="loading" text :repeat="6" />
        <n-data-table v-else :columns="columns" :data="trainerApplications" :bordered="false" />
      </n-card>
    </n-space>
  </template>
  
  <script setup>
  import { h, onMounted, ref } from 'vue';
  import { NButton, useMessage } from 'naive-ui';
  import { ApprovalStatus } from '@/constants';
  import { trainerApplicationApi } from '@/api';
  import { useRoute } from 'vue-router';
  
  const RemoveButton = trainerApplication => {
    return h(
      NButton,
      {
        secondary: true,
        type: 'error',
        size: 'small',
        onClick: () => updateApprovalStatus(trainerApplication.id, false),
      },
      { default: () => 'Remove' },
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
    { title: 'FirstName', key: 'firstName' },
    { title: 'LastName', key: 'lastName' },
    { title: 'Date Of Birth', key: 'dateOfBirth' },
    { title: 'Phone Number', key: 'trainerPhone' },
    { title: 'Motivational Letter', key: 'motivationalLetter' },
    { title: 'Certificate', key: 'certificate', render: CertificateButton },
    { title: 'Remove', key: 'remove', render: RemoveButton },
  ];
  
  const trainerApplications = ref([]);
  const loading = ref(true);
  const route = useRoute();
  const clubId = route.params.clubId;
  
  const message = useMessage();
  
  onMounted(async () => {
    const data = await trainerApplicationApi.getAccepted(clubId);
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
