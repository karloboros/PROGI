<template>
  <n-spin v-if="!items.length" class="spinner">
    <ples-map :items="items" :filters="filters" height="78vh" />
  </n-spin>
  <ples-map v-else :items="items" :filters="filters" height="78vh" />
</template>

<script setup>
import PlesMap from '@/components/common/PlesMap.vue';

defineProps({
  items: { type: Array, required: true },
  filters: { type: Array, required: true },
});
</script>
