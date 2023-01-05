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
import { ApprovalStatus } from '@/constants';
import { trainerApplicationApi } from '@/api';
import { useRoute } from 'vue-router';
// require('vue-msgbox/lib/vue-msgbox.css');
// const MessageBox = require('vue-msgbox');

const ApproveButton = trainerApplication => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => updateApprovalStatus(trainerApplication.id, ApprovalStatus.Approved),
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
      onClick: () => updateApprovalStatus(trainerApplication.id, ApprovalStatus.Rejected),
    },
    { default: () => 'Reject' },
  );
};

// const ExperienceButton = trainerApplication => {
//  return h(
//    NButton,
//    {
//      secondary: false,
//      type: 'link',
//      size: 'small',
//      onClick: () => MessageBox('Experience', trainerApplication.experienceDescription, 'type'),
//    },
//    { default: () => 'Check their experience!' },
//  );
// };

const columns = [
  { title: 'FirstName', key: 'firstName' },
  { title: 'LastName', key: 'lastName' },
  { title: 'Date Of Birth', key: 'dateOfBirth' },
  { title: 'Phone Number', key: 'trainerPhone' },
  { title: 'Motivational Letter', key: 'motivationalLetter' },
  //  { title: 'Experience Description', key: 'see experience', render: ExperienceButton },
  { title: 'Approve', key: 'approve', render: ApproveButton },
  { title: 'Reject', key: 'reject', render: RejectButton },
];

const trainerApplications = ref([]);
const loading = ref(true);
const route = useRoute();
const clubId = route.params.clubId;

const message = useMessage();

onMounted(async () => {
  const data = await trainerApplicationApi.getPending(clubId);
  trainerApplications.value = data.map(trainerApplication => ({
    firstName: trainerApplication.trainer.firstName,
    lastName: trainerApplication.trainer.lastName,
    trainerPhone: trainerApplication.trainer.phone,
    motivationalLetter: trainerApplication.trainer.motivationalLetter,
    dateOfBirth: trainerApplication.trainer.dateOfBirth,
    experience: trainerApplication.experienceDescription,
  }));

  loading.value = false;
});

const updateApprovalStatus = async (id, approvalStatus) => {
  try {
    await trainerApplicationApi.update({ id, approvalStatus });
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
