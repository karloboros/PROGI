<template>
  <n-space class="view-events" align="center" justify="center" item-style="width: 80%">
    <n-card title="All events" size="huge">
      <template #header-extra>
        <n-button @click="router.push({ name: 'EventCreate' })">Add event</n-button>
      </template>
      <n-skeleton v-if="loading" text :repeat="6" />
      <n-data-table v-else :columns="columns" :data="events" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { createButton } from '@/utils';
import { eventApi } from '@/api';
import { NButton } from 'naive-ui';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const EditButton = event => {
  const type = 'warning';
  const label = 'Edit';
  const onClick = () => router.push({ name: 'EventEdit', params: { id: event.id } });
  return createButton({ type, label, onClick });
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Start date and time', key: 'startTime' },
  { title: 'Club name', key: 'club.name' },
  { title: 'Edit', key: 'edit', render: EditButton },
];

const events = ref([]);
const loading = ref(true);

onMounted(async () => {
  events.value = await eventApi.fetchAll();
  events.value = events.value.filter(event => event.club.ownerId === authStore.user.id);
  loading.value = false;
});
</script>

<style scoped>
.view-events ::v-deep(.n-data-table-th),
.view-events ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
