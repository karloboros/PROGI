<template>
  <landing-map :items="items" :filters="filters" />
</template>

<script setup>
import { courseApi, danceApi } from '@/api';
import { createFilterOptions, formatCoordinates, getTimespanIds } from '@/utils';
import { onMounted, ref } from 'vue';
import LandingMap from './LandingMap.vue';
import { timespans } from '@/constants';

const items = ref([]);
const filters = ref([]);

onMounted(async () => {
  const courses = await courseApi.fetchActive();
  items.value = courses.map(({ id, name, description, location, danceId, lessons }) => ({
    id,
    content: `<h4>${name}</h4><p>${description}</p><a href='/course/${id}'>More details...</a>`,
    coordinates: formatCoordinates(location.coordinates),
    dances: [danceId],
    hours: getTimespanIds(lessons),
  }));

  const dances = await danceApi.fetchAll();
  const dancesOptions = createFilterOptions(dances);
  const hours = timespans;
  const hoursOptions = createFilterOptions(hours);

  filters.value = [
    { name: 'dances', options: dancesOptions },
    { name: 'hours', options: hoursOptions },
  ];
});
</script>
