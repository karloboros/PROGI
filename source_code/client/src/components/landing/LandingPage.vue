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
  <n-modal v-model:show="navigationStore.showClubCreateModal">
    <ples-modal>
      <club-create />
    </ples-modal>
  </n-modal>
</template>

<script setup>
import { useAuthStore, useNavigationStore } from '@/store';
import ClubCreate from '@/components/club/ClubCreate.vue';
import ClubSearch from './ClubSearch.vue';
import { computed } from 'vue';
import MapClubs from './LandingMapClubs.vue';
import MapCourses from './LandingMapCourses.vue';
import MapEvents from './LandingMapEvents.vue';
import PlesModal from '@/components/common/PlesModal.vue';

const navigationStore = useNavigationStore();

const isLoggedIn = computed(() => useAuthStore().isLoggedIn);
</script>
