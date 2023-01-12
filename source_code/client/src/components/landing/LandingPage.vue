<template>
  <n-tabs type="segment">
    <n-tab-pane name="clubs" tab="Clubs">
      <map-clubs />
    </n-tab-pane>
    <n-tab-pane name="events" tab="Events">
      <map-events />
    </n-tab-pane>
    <n-tab-pane v-if="isLoggedIn" name="courses" tab="Courses">
      <map-courses />
    </n-tab-pane>
  </n-tabs>
  <club-search />
</template>

<script setup>
import ClubSearch from './ClubSearch.vue';
import { computed } from 'vue';
import MapClubs from './LandingMapClubs.vue';
import MapCourses from './LandingMapCourses.vue';
import MapEvents from './LandingMapEvents.vue';
import { useAuthStore } from '@/store';

const isLoggedIn = computed(() => useAuthStore().isLoggedIn);
</script>
