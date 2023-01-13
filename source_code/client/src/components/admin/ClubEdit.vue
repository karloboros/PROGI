<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Club" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete club</n-button>
      </template>
      <club-create v-if="club" :initial-values="club" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { clubApi } from '@/api';
import ClubCreate from '@/components/club/ClubCreate.vue';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();
const route = useRoute();
const { id } = route.params;

const club = ref(null);

onMounted(async () => {
  club.value = await clubApi.fetchById(id);
});

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete this club. This is irreversible!',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await clubApi.remove(id);
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response.data.message || err);
  }
};
</script>
