<template>
  <landing-map :items="items" :filters="filters" />
</template>

<script setup>
import { clubApi, danceApi } from '@/api';
import { createFilterOptions, formatCoordinates } from '@/utils';
import { onMounted, ref } from 'vue';
import LandingMap from './LandingMap.vue';

const items = ref(null);
const filters = ref([]);

onMounted(async () => {
  const clubs = await clubApi.fetchWithDances();
  items.value = clubs.map(({ id, name, description, location, danceIds }) => ({
    id,
    content: `<h4>${name}</h4><p>${description}</p><a href='/club/${id}'>More details...</a>`,
    coordinates: formatCoordinates(location.coordinates),
    dances: danceIds,
  }));

  const dances = await danceApi.fetchAll();
  const dancesOptions = createFilterOptions(dances);

  filters.value = [{ name: 'dances', options: dancesOptions }];
});
</script>
