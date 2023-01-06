<template>
  <n-space class="view-dances" align="center" justify="center" item-style="width: 80%">
    <n-card title="All dances" size="huge">
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="dances" :bordered="false" />
      <n-button @click="router.push({ name: 'AddDance' })">Add dance</n-button>
    </n-card>
  </n-space>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { danceApi } from '@/api';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const EditButton = dance => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => viewDanceDetails(dance.id),
    },
    { default: () => 'Edit' },
  );
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Image', key: 'image' },
  { title: 'VIdeo url', key: 'videoUrl' },
  { title: 'Edit', key: 'edit', render: EditButton },
];

const dances = ref([]);
const loading = ref(true);

onMounted(async () => {
  dances.value = await danceApi.fetchAll();
  loading.value = false;
});

const viewDanceDetails = id => {
  router.push({
    name: 'EditDance',
    params: { id },
  });
};
</script>

<style scoped>
.view-dances ::v-deep(.n-data-table-th),
.view-dances ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
