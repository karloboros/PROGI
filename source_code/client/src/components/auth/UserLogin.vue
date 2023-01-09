<template>
  <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Username" path="username">
      <n-input v-model:value="values.username" placeholder="Username..." autofocus />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input v-model:value="values.password" type="password" show-password-on="mousedown" placeholder="Password..." />
    </n-form-item>

    <n-form-item>
      <n-button type="primary" attr-type="submit">Login</n-button>
    </n-form-item>
    <n-form-item>
      <n-p>
        Don't have an account?
        <n-a @click="$emit('swap')" quaternary>Click here to register</n-a>
      </n-p>
    </n-form-item>
    <n-form-item>
      <div id="app" class="container mt-3 mt-sm-5">
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
    </n-form-item>
  </n-form>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import { attribution, mapBackground, view } from '@/constants';
import { authApi } from '@/api';
import { defaultRoute } from '@/router';
import L from 'leaflet';
// eslint-disable-next-line sort-imports
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import validationRules from '@/utils/rules';

const disabled1 = ref(false);
const disabled2 = ref(false);
const events = ref([]);
const eventsToMap = L.layerGroup();
const eventsToChangeDisplay = ref([]);
const eventsToChangeDisplay2 = ref([]);
const clubs = ref([]);
const dances = ref([]);
const map = ref(null);
const locations = ref([]);

const initialValues = {
  username: '',
  password: '',
};

const { required } = validationRules;
const rules = {
  username: required,
  password: required,
};

const values = ref(initialValues);
const formRef = ref(null);

const message = useMessage();
const router = useRouter();
const authStore = useAuthStore();

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
  dances.value.forEach(e => {
    e.active = false;
  });
  map.value.removeLayer(eventsToMap);
  eventsToMap.value = eventsToMap.clearLayers();
};

const layerDanceChanged = dance => {
  // map.value.addLayer(eventsToMap2);
  dances.value.forEach(d => {
    if (d.id === dance.id) {
      eventsToChangeDisplay2.value.push(d.events);
    }
  });

  let coordinates = '';
  eventsToChangeDisplay2.value.forEach(async array => {
    array.forEach(async event => {
      const eventloc = await authApi.fetchEventLocation();
      eventloc.forEach(e => {
        if (e.id === event.eventDance.id) {
          coordinates = e.location.coordinates;
          const coords = coordinates.split(',');
          const x = Number(coords[0]);
          const y = Number(coords[1]);

          console.log(event.active);
          if (event.active) {
            event.active = false;
            eventsToMap.eachLayer(layer => {
              if (layer._latlng.lat === x && layer._latlng.lng === y) eventsToMap.removeLayer(layer._leaflet_id);
            });
          } else {
            event.active = true;
            eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.name}`));
          }
        }
      });
    });
  });
  eventsToChangeDisplay2.value = [];
  map.value.addLayer(eventsToMap.value);
};

const layerClubChanged = club => {
  // map.value.addLayer(eventsToMap);
  events.value.forEach(event => {
    if (event.clubId === club.id) {
      eventsToChangeDisplay.value.push(event.value);
    }
  });

  eventsToChangeDisplay.value.forEach(event => {
    const coords = event.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);

    console.log(event.active);
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

onMounted(async () => {
  initMap();
  const data = await authApi.fetchEventLocation();
  const dataDances = await authApi.fetchDanceEvents();

  for (const dance of dataDances) {
    dance.value = {
      id: dance.id,
      name: dance.name,
      description: dance.description,
      image: dance.image,
      videoUrl: dance.videoUrl,
      events: dance.events,
      active: false,
    };
    dances.value.push({
      id: dance.id,
      name: dance.name,
      events: dance.value.events,
      active: false,
    });
  }

  for (const event of data) {
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

    locations.value.push({
      locationId: event.locationId,
      eventId: event.id,
      clubId: event.clubId,
      locationcoord: event.coordinates,
    });

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
    eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(event.value.locationName));
    eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.value.name}`));
  }
  map.value.addLayer(eventsToMap);
});

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const user = await authApi.login({ ...values.value });
        authStore.setUser(user);
        router.push(defaultRoute);
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
</script>

<style scoped>
.map {
  width: 600px;
  height: 400px;
  position: relative;
  outline: none;
}
</style>
