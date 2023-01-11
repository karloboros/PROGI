<template>
  <div class="container">
    <div id="map" class="map" />
    <n-popselect v-model:value="selectedLayers" :options="layers" multiple>
      <n-button type="warning" class="filters z-1000">
        Filters: {{ selectedLayers.length ? selectedDisplay : '-' }}
      </n-button>
    </n-popselect>
  </div>
</template>

<script setup>
import { attribution, mapBackground, view } from '@/constants/map';
import { computed, onMounted, ref, watch } from 'vue';
import { arrayDifference } from '@/utils';
import L from 'leaflet';

const props = defineProps({
  layers: {
    type: Array,
    default: () => [],
  },
});

const mapLayers = layers => {
  return layers.map(layer => ({
    ...layer,
    value: layer.name,
    label: layer.name,
  }));
};

const layers = ref(mapLayers(props.layers));
let map;
let tileLayer;

const selectedLayers = ref([]);
const selectedDisplay = computed(() => selectedLayers.value.toString().replace('"', '').replace(',', ', '));

const refreshLayer = name => {
  const data = layers.value.find(layer => layer.name === name);
  data.active = !data.active;
  data.locations.forEach(location => {
    if (data.active) location.marker.addTo(map);
    else location.marker.removeFrom(map);
  });
};

watch(selectedLayers, (newValue, prevValue) => {
  const [difference] = arrayDifference(newValue, prevValue);
  refreshLayer(difference);
});

const initMap = () => {
  map = L.map('map').setView(view, 12);
  tileLayer = L.tileLayer(mapBackground, { attribution });
  tileLayer.addTo(map);
};

const createMarker = location => {
  location.marker = L.marker(location.coordinates).bindPopup(location.content);
};

const initLayers = () => {
  layers.value.forEach(layer => {
    layer.locations.forEach(location => {
      createMarker(location);
    });
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
