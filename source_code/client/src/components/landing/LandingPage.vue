<template>
  <n-spin v-if="!layers.length">
    <ples-map :layers="layers" />
  </n-spin>
  <ples-map v-else :layers="layers" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { eventApi } from '@/api';
import PlesMap from '@/components/common/PlesMap.vue';

const layers = ref([]);

onMounted(async () => {
  const events = await eventApi.fetchAll();
  const eventsLocations = events.map(({ id, name: content, location }) => {
    const coordinates = location.coordinates.split(',');
    return { id, content, coordinates };
  });

  layers.value = [
    {
      id: 0,
      name: 'Events',
      active: false,
      locations: eventsLocations,
    },
  ];
});
</script>
