<template>
  <div class="row">
    <div class="col-md-9">
      <div id="map" class="map"></div>
    </div>
    <div class="col-md-3">
      <div v-for="layer in layers" :key="layer.id" class="form-check">
        <label class="form-check-label">
          <input
            v-model="layer.active"
            @change="layerChanged(layer.id, layer.active)"
            class="form-check-input"
            type="checkbox"
          />
          {{ layer.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import { attribution, layers, mapBackground, view } from '@/constants';
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const map = ref(null);
const tileLayer = ref(null);

const layerChanged = (layerId, active) => {
  const layer = layers.find(layer => layer.id === layerId);

  layer.features.forEach(feature => {
    if (active) {
      feature.leafletObject.addTo(map.value);
    } else {
      feature.leafletObject.removeFrom(map.value);
    }
  });
};

const initLayers = () => {
  layers.forEach(layer => {
    layer.features.forEach(feature => {
      feature.leafletObject = L.marker(feature.coords).bindPopup(feature.name);
    });
  });
};
const initMap = () => {
  map.value = L.map('map').setView(view, 12);
  tileLayer.value = L.tileLayer(mapBackground, { attribution });
  tileLayer.value.addTo(map.value);
};

onMounted(() => {
  initMap();
  initLayers();
});
</script>

<style scoped>
.map {
  height: 600px;
}
</style>
