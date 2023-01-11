<template>
  <div class="container">
    <div id="map" class="map" />
  </div>
</template>

<script setup>
import { attribution, mapBackground, view } from '@/constants/map';
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const items = ref(props.items);
let map;
let tileLayer;

const initMap = () => {
  map = L.map('map').setView(view, 12);
  tileLayer = L.tileLayer(mapBackground, { attribution });
  tileLayer.addTo(map);
};

const createMarker = location => {
  location.marker = L.marker(location.coordinates).bindPopup(location.content);
};

const showLocation = location => {
  location.marker.addTo(map);
};

const initLayers = () => {
  items.value.forEach(location => {
    createMarker(location);
    showLocation(location);
  });
};

onMounted(() => {
  initMap();
  initLayers();
});
</script>

<style scoped>
.container {
  position: relative;
}

.map {
  height: 600px;
  width: 100%;
}

.filters {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
}
</style>
