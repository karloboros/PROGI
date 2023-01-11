<template>
  <div class="container mt-3 mt-sm-5">
    <div class="row">
      <div
        class="col-md-9 leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
      >
        <div id="map" class="map"></div>
      </div>
      <div class="col-md-3">
        <n-space vertical>
          <n-checkbox v-model:checked="disabled1" @change="Clubs()" :disabled="disabled2"> Clubs </n-checkbox>
          <n-checkbox v-model:checked="disabled2" @change="Dances()" :disabled="disabled1">Dances </n-checkbox>
        </n-space>
        <h5>Filter events according to clubs:</h5>
        <div v-for="club in clubs" :key="club.id" class="form-check">
          <label class="form-check-label">
            <input
              v-model="club.active"
              @change="layerClubChanged(club)"
              class="form-check-input1"
              type="checkbox"
              :disabled="!disabled1"
            />
            {{ club.name }}
          </label>
        </div>
        <h5>Filter events according to dances:</h5>
        <div v-for="dance in dances" :key="dance.id" class="form-check">
          <label class="form-check-label">
            <input
              v-model="dance.active"
              @change="layerDanceChanged(dance)"
              class="form-check-input"
              type="checkbox"
              :disabled="!disabled2"
            />
            {{ dance.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import { attribution, mapBackground, view } from '@/constants';
import { danceApi, eventApi } from '@/api';
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const clubs = ref([]);
const dances = ref([]);
const data = ref([]);
const disabled1 = ref(false);
const disabled2 = ref(false);
const events = ref([]);
const eventsToMap = L.layerGroup();
const eventsToChangeDisplay = ref([]);
const eventsToChangeDisplay2 = ref([]);
const map = ref(null);

const initMap = () => {
  map.value = L.map('map').setView(view, 12);
  L.tileLayer(mapBackground, { attribution }).addTo(map.value);
};

const Clubs = () => {
  clubs.value.forEach(e => {
    e.active = false;
  });
  map.value.removeLayer(eventsToMap);
  eventsToMap.value = eventsToMap.clearLayers();
};

const Dances = () => {
  dances.value.forEach(d => {
    d.active = false;
  });
  map.value.removeLayer(eventsToMap);
  eventsToMap.value = eventsToMap.clearLayers();
};

const layerClubChanged = club => {
  map.value.addLayer(eventsToMap);
  events.value.forEach(event => {
    if (event.clubId === club.id) {
      eventsToChangeDisplay.value.push(event.value);
    }
  });

  eventsToChangeDisplay.value.forEach(event => {
    const coords = event.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);

    if (event.active) {
      event.active = false;
      eventsToMap.eachLayer(layer => {
        if (layer._latlng.lat === x && layer._latlng.lng === y) eventsToMap.removeLayer(layer._leaflet_id);
      });
    } else {
      event.active = true;
      eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.name}`));
    }
  });

  eventsToChangeDisplay.value = [];
  map.value.addLayer(eventsToMap);
};

const layerDanceChanged = dance => {
  map.value.addLayer(eventsToMap);
  dances.value.forEach(d => {
    if (d.id === dance.id) {
      eventsToChangeDisplay2.value.push(d.events);
    }
  });

  let coordinates = '';
  eventsToChangeDisplay2.value.forEach(async array => {
    for (const event of array) {
      data.value.forEach(e => {
        if (e.id === event.eventDance.eventId) {
          coordinates = e.location.coordinates;
          const coords = coordinates.split(',');
          const x = Number(coords[0]);
          const y = Number(coords[1]);

          if (dance.active === false) {
            eventsToMap.eachLayer(layer => {
              if (layer._latlng.lat === x && layer._latlng.lng === y) eventsToMap.removeLayer(layer._leaflet_id);
            });
          } else {
            eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.name}`));
          }
        }
      });
    }
  });

  eventsToChangeDisplay2.value = [];
  map.value.addLayer(eventsToMap.value);
};

onMounted(async () => {
  initMap();
  data.value = await eventApi.fetchAll();
  const dataDances = await danceApi.fetchAll();

  for (const dance of dataDances) {
    dance.value = {
      ...dance,
      active: false,
    };
    dances.value.push(dance.value);
  }

  data.value.forEach(event => {
    event.value = {
      id: event.id,
      name: event.name,
      description: event.description,
      clubId: event.clubId,
      club: event.club,
      clubName: event.club.name,
      locationId: event.locationId,
      location: event.location,
      locationName: event.location.name,
      coordinates: event.location.coordinates,
      active: false,
    };

    let find = false;
    clubs.value.forEach(c => {
      if (c.id === event.clubId) {
        find = true;
      }
    });

    if (!find) {
      clubs.value.push({
        id: event.clubId,
        name: event.club.name,
        active: false,
      });
    }
    events.value.push(event);

    const coords = event.value.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.value.name}`));
  });
  map.value.addLayer(eventsToMap);
});
</script>

<style scoped>
.map {
  width: 600px;
  height: 400px;
  position: relative;
  outline: none;
}
</style>
