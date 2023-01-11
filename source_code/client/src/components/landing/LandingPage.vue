<template>
  <n-spin v-if="!layers.length">
    <ples-map :layers="layers" />
  </n-spin>
  <ples-map v-else :layers="layers" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { layers as lalalala } from '@/constants/map';
import PlesMap from '@/components/common/PlesMap.vue';

const layers = ref([]);

onMounted(() => {
  layers.value = lalalala;
});
</script>
