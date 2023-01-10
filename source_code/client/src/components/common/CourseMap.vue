<template>
  <div class="row">
    <div class="col-md-9">
      <div id="map" class="map"></div>
    </div>
    <div class="col-md-3">
      <h5>Filtriraj po plesovima</h5>
      <div v-for="dance in dances" :key="dance.id" class="form-check">
        <label class="form-check-label">
          <input v-model="dance.active" @change="layerChanged(dance)" class="form-check-input" type="checkbox" />
          {{ dance.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import { attribution, mapBackground, view } from '@/constants';
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import L from 'leaflet';

const map = ref(null);
const tileLayer = ref(null);
const courses = ref([]);
const dances = ref([]);
const coursesToMap = L.layerGroup();

const layerChanged = dance => {
  const coursesToChangeDisplay = courses.value.find(course => course.danceId === dance.id);

  for (const course in coursesToChangeDisplay.value) {
    if (course.active) {
      const coords = course.coordinates.split(',');
      const x = Number(coords[0]);
      const y = Number(coords[1]);
      coursesToMap.addLayer(
        L.marker(L.latLng(x, y)).bindPopup(
          `${course.name}</br><a href="/courses/${course.id}"><button>Go to</button></a>`,
        ),
      );
    } else {
      const layerToChange = coursesToMap.value.find(c => c.danceId === dance.id);

      coursesToMap.removeLayer(layerToChange);
    }
    map.value.addLayer(coursesToMap);
  }
};

const initLayers = async () => {
  const data = await courseApi.fetchByCourseId();

  for (const course of data) {
    course.value = {
      id: course.id,
      name: course.name,
      description: course.description,
      applicationDeadline: new Date(data.applicationDeadline),
      clubId: course.clubId,
      locationId: course.locationId,
      locationName: course.location.name,
      coordinates: course.location.coordinates,
      dance: course.dance,
      danceId: course.danceId,
      danceName: course.dance.name,
      active: true,
    };
    courses.value.push(course);

    let find = false;
    dances.value.forEach(d => {
      if (d.id === course.dance.id) {
        find = true;
      }
    });
    if (!find) {
      dances.value.push({
        id: course.dance.id,
        name: course.dance.name,
        active: true,
      });
    }
    const coords = course.value.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    coursesToMap.addLayer(
      L.marker(L.latLng(x, y)).bindPopup(
        `${course.value.name}</br><a href="/courses/${course.value.id}"><button>Go to</button></a>`,
      ),
    );
  }
};
const initMap = () => {
  map.value = L.map('map').setView(view, 12);
  tileLayer.value = L.tileLayer(mapBackground, { attribution });
  tileLayer.value.addTo(map.value);
};

onMounted(async () => {
  initMap();
  await initLayers();
  map.value.addLayer(coursesToMap);
});
</script>

<style scoped>
.map {
  height: 600px;
}
</style>
