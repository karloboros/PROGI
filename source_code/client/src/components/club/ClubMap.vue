<template>
  <n-spin v-if="!items" class="spinner">
    <ples-map height="40vh" />
  </n-spin>
  <ples-map v-else :items="items" height="40vh" />
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { formatCoordinates } from '@/utils';
import PlesMap from '@/components/common/PlesMap.vue';

const props = defineProps({
  location: { type: Object, default: () => {} },
});

const items = ref([]);

watchEffect(async () => {
  const {
    location: { id, name, coordinates },
  } = props;
  const data = {
    id,
    content: `<h4>Dvorana: ${name}</h4><p>${coordinates}</p>`,
    coordinates: formatCoordinates(coordinates),
  };
  items.value = [data];
});
</script>
