<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Dance" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete dance</n-button>
      </template>
      <dance-create v-if="dance" :initial-values="dance" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { danceApi } from '@/api';
import DanceCreate from '@/components/admin/DanceCreate.vue';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();

const route = useRoute();
const { id } = route.params;

const dance = ref(null);

onMounted(async () => {
  dance.value = await danceApi.fetchById(id);
});

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete this dance. This is irreversible!',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await danceApi.remove(id);
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response.data.message || err);
  }
};
</script>
