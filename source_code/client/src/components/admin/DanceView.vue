<template>
  <n-space class="dance-adding" align="center" justify="center" item-style="width: 80%">
    <n-card title="Dance" size="huge" loading="loading">
      <n-skeleton v-if="loading" />
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete dance</n-button>
      </template>
      <dance-add :initial-values="dance" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import DanceAdd from '@/components/admin/AddDance.vue';
import { danceApi } from '@/api';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();

const route = useRoute();
const id = route.params.id;

const dance = ref([]);
const loading = ref(true);

onMounted(async () => {
  const data = await danceApi.fetchById(id);
  dance.value = { name: data.name, description: data.description, videoUrl: data.videoUrl, image: data.image };
  console.log(dance.value);
  loading.value = false;
});

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete this dance. This is irreversible!',
    positiveText: 'Yes',
    negativeText: 'No',
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
