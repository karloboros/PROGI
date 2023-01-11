<template>
  <n-spin v-if="!items.length">
    <ples-map :items="items" :filters="filters" />
  </n-spin>
  <ples-map v-else :items="items" :filters="filters" height="80%" />
</template>

<script setup>
import { clubApi, danceApi, eventApi } from '@/api';
import { createFilterOptions, formatCoordinates, getIds } from '@/utils';
import { onMounted, ref } from 'vue';
import PlesMap from '@/components/common/PlesMap.vue';

const items = ref([]);
const filters = ref([]);

onMounted(async () => {
  const events = await eventApi.fetchAll();
  items.value = events.map(({ id, name, location, dances, clubId }) => ({
    id,
    content: name,
    coordinates: formatCoordinates(location.coordinates),
    dances: getIds(dances),
    clubs: [clubId],
  }));

  const dances = await danceApi.fetchAll();
  const dancesOptions = createFilterOptions(dances);
  const clubs = await clubApi.fetchAll();
  const clubsOptions = createFilterOptions(clubs);

  filters.value = [
    { name: 'dances', options: dancesOptions },
    { name: 'clubs', options: clubsOptions },
  ];
});
</script>
