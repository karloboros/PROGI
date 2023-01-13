<template>
  <div class="container">
    <div id="map" class="map" />
    <n-space class="filters z-1000">
      <n-popselect
        v-for="{ name, options } in filters"
        :key="name"
        v-model:value="selected[name]"
        :on-update:value="newValue => selectFilter(newValue, name)"
        :options="options"
        multiple
      >
        <n-button type="warning">{{ name }}</n-button>
      </n-popselect>
    </n-space>
  </div>
</template>

<script setup>
import { attribution, mapBackground, view } from '@/constants/map';
import { onMounted, reactive, ref } from 'vue';
import L from 'leaflet';

const props = defineProps({
  items: { type: Array, default: () => [] },
  filters: { type: Array, default: () => [] },
  width: { type: String, default: '100%' },
  height: { type: String, default: '600px' },
});

let map;
let tileLayer;
const items = ref(props.items);
const selected = reactive([]);

const selectFilter = (newValue, filterName) => {
  clearFilters();
  clearMap();
  selected[filterName] = newValue;

  const isAllOptionSelected = newValue.includes(0);
  if (isAllOptionSelected) return populateMap();

  newValue.forEach(value => {
    items.value.forEach(location => {
      location[filterName].forEach(id => {
        if (id === value) showLocationOnMap(location);
      });
    });
  });
};

const initMap = () => {
  map = L.map('map').setView(view, 13);
  tileLayer = L.tileLayer(mapBackground, { attribution });
  tileLayer.addTo(map);
};

const initItems = () => {
  items.value.forEach(location => {
    createMarker(location);
    showLocationOnMap(location);
  });
};

const clearFilters = () => {
  props.filters.forEach(filter => {
    selected[filter.name] = [];
  });
};

const createMarker = location => {
  location.marker = L.marker(location.coordinates).bindPopup(location.content);
};

const showLocationOnMap = location => {
  location.marker.addTo(map);
};

const clearMap = () => {
  items.value.forEach(location => {
    location.marker.removeFrom(map);
  });
};

const populateMap = () => {
  items.value.forEach(location => {
    showLocationOnMap(location);
  });
};

onMounted(() => {
  initMap();
  initItems();
});
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
}

.map {
  width: v-bind('width');
  height: v-bind('height');
}

.filters {
  position: absolute;
  top: 12px;
  right: 12px;
}

.filters button {
  text-transform: capitalize;
}
</style>
