<template>
  <n-space class="view-dances" align="center" justify="center" item-style="width: 80%">
    <n-card title="All dances" size="huge">
      <template #header-extra>
        <n-button @click="router.push({ name: 'DanceCreate' })">Add dance</n-button>
      </template>
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="dances" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { createButton } from '@/utils';
import { danceApi } from '@/api';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const EditButton = dance => {
  const type = 'warning';
  const label = 'Edit';
  const onClick = () => router.push({ name: 'DanceEdit', params: { id: dance.id } });
  return createButton({ type, label, onClick });
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
</script>

<style scoped>
.view-dances ::v-deep(.n-data-table-th),
.view-dances ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
