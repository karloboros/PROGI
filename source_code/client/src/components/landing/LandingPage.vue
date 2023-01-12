<template>
  <n-tabs type="segment">
    <n-tab-pane name="clubs" tab="Clubs">
      <map-clubs />
    </n-tab-pane>
    <n-tab-pane name="events" tab="Events">
      <map-events />
    </n-tab-pane>
  </n-tabs>
  <club-search />
</template>

<script setup>
import ClubSearch from './ClubSearch.vue';
import MapClubs from './LandingMapClubs.vue';
import MapEvents from './LandingMapEvents.vue';
</script>
