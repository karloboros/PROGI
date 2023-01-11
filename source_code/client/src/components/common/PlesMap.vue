<template>
  <div class="container">
    <div id="map" class="map" />
    <n-popselect
      v-for="{ name, options } in filters"
      :key="name"
      v-model:value="selected"
      :on-update:value="newValue => selectFilter(newValue, name)"
      :options="options"
      multiple
    >
      <n-button type="warning" class="filters z-1000">{{ name }}</n-button>
    </n-popselect>
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
  filters: {
    type: Array,
    default: () => [],
  },
});

let map;
let tileLayer;
const items = ref(props.items);

const selected = ref([0]);

const selectFilter = (newValue, filterName) => {
  selected.value = newValue;
  clearMap();
  if (newValue.includes(0)) return populateMap();
  newValue.forEach(value => {
    items.value.forEach(location => {
      location[filterName].forEach(id => {
        if (id === value) showLocation(location);
      });
    });
  });
};

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

const clearMap = () => {
  items.value.forEach(location => {
    location.marker.removeFrom(map);
  });
};

const populateMap = () => {
  items.value.forEach(location => {
    location.marker.addTo(map);
  });
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
