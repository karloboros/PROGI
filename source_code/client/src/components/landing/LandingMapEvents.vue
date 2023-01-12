<template>
  <landing-map :items="items" :filters="filters" />
</template>

<script setup>
import { clubApi, danceApi, eventApi } from '@/api';
import { createFilterOptions, formatCoordinates, getIds } from '@/utils';
import { onMounted, ref } from 'vue';
import LandingMap from './LandingMap.vue';

const items = ref([]);
const filters = ref([]);

onMounted(async () => {
  const events = await eventApi.fetchAll();
  items.value = events.map(({ id, name, description, location, dances, clubId }) => ({
    id,
    content: `<h4>${name}</h4><p>${description}</p>`,
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
