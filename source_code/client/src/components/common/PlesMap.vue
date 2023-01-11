<template>
  <div id="map" class="map" />
  <div v-for="layer in layers" :key="layer.id">
    <label>
      <input v-model="layer.active" @change="refreshLayer(layer)" type="checkbox" />
      {{ layer.name }}
    </label>
  </div>
</template>

<script setup>
import { attribution, mapBackground, view } from '@/constants/map';
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const props = defineProps({
  layers: {
    type: Array,
    default: () => [],
  },
});

const layers = ref(props.layers);
let map;
let tileLayer;

const refreshLayer = layer => {
  layer.locations.forEach(location => {
    if (layer.active) location.marker.addTo(map);
    else location.marker.removeFrom(map);
  });
};

const initMap = () => {
  map = L.map('map').setView(view, 12);
  tileLayer = L.tileLayer(mapBackground, { attribution });
  tileLayer.addTo(map);
};

const initLayers = () => {
  layers.value.forEach(layer => {
    layer.locations.forEach(location => {
      createMarker(location);
    });
  });
};

const createMarker = location => {
  location.marker = L.marker(location.coordinates).bindPopup(location.content);
};

onMounted(() => {
  initMap();
  initLayers();
});
</script>

<style scoped>
.map {
  height: 600px;
  width: 100%;
}
</style>
