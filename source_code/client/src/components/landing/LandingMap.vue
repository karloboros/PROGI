<template>
  <n-spin v-if="!items" class="spinner">
    <ples-map height="75vh" />
  </n-spin>
  <ples-map v-else :items="items" :filters="filters" height="75vh" />
</template>

<script setup>
import PlesMap from '@/components/common/PlesMap.vue';

defineProps({
  items: { type: Array, default: null },
  filters: { type: Array, required: true },
});
</script>
