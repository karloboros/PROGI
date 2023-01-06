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
            <h5>Filtriraj događaje po klubovima:</h5>
            <div v-for="club in clubs" :key="club.id" class="form-check">
              <label class="form-check-label">
                <input v-model="club.active" @change="layerChanged(club)" class="form-check-input" type="checkbox" />
                {{ club.name }} {{ club.id }}
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

const events = ref([]);
const eventsToMap = L.layerGroup();
const eventsToChangeDisplay = ref([]);
const clubs = ref([]);
const map = ref(null);

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

// const overlays = ref([]);
// const overlaysTree = L.layerTree();
// const layer = ref(null);

const initMap = () => {
  map.value = L.map('map').setView(view, 12);
  L.tileLayer(mapBackground, { attribution }).addTo(map.value);
};

const layerChanged = club => {
  console.log(club);
  console.log(club.name);
  console.log(club.id);

  events.value.forEach(event => {
    if (event.clubId === club.id) {
      eventsToChangeDisplay.value.push(event.value);
      console.log(event.value);
    }
  });

  console.log(eventsToChangeDisplay.value);
  eventsToChangeDisplay.value.forEach(event => {
    const coords = event.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);

    if (event.active) {
      event.active = false;
      eventsToMap.eachLayer(layer => {
        if (layer._latlng.lat === x && layer._latlng.lng === y) eventsToMap.removeLayer(layer._leaflet_id);
      });
      // eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.name}`));
    } else {
      console.log('IZ NEAKTIVNO U AKTIVNO');
      event.active = true;

      // console.log(eventsToMap.getLayers());
      // eventsToMap._layers.forEach(layer => {
      // if (layer._latlng.lat === x && layer._latlng.lng === y)
      eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.name}`));
      // });
      console.log(eventsToMap);
    }
    map.value.addLayer(eventsToMap);
  });
  // eslint-disable-next-line no-const-assign
  eventsToChangeDisplay.value.forEach(el => {
    eventsToChangeDisplay.value.pop(el.value);
  });
};

onMounted(async () => {
  initMap(); //
  const data = await authApi.fetchEventLocation();
  for (const event of data) {
    event.value = {
      name: event.name,
      description: event.description,
      clubId: event.clubId,
      club: event.club,
      clubName: event.club.name,
      locationId: event.locationId,
      location: event.location,
      locationName: event.location.name,
      coordinates: event.location.coordinates,
      active: true,
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
        active: true,
      });
    }

    console.log(event.value);
    events.value.push(event);
    const coords = event.value.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(`${event.value.name}`));

    /* layer.value = {
      label: event.value.name,
      layer: L.marker(L.latLng(x, y)).bindPopup(event.value.locationName),
    }; */
    // overlaysTree.value.children.push(layer.value);
  }
  console.log(eventsToMap);
  console.log(eventsToMap.getLayers());
  map.value.addLayer(eventsToMap);
  // console.log(overlaysTree);
  // console.log(overlaysTree.value.children);
  // eventsToMap.layers.addTo(overlaysTree.value.children); //
  /* clubs.value = {
    label: 'Clubs',
    selectAllCheckbox: false,
    layer: eventsToMap,
  }; */
  // map.value.addLayer(overlaysTree);
  /* overlays.value = {
    'All events ': eventsToMap,
  }; */
  // console.log(clubs.value.label === 'Clubs');

  /* const layerControl = L.control.layers.tree(null, overlaysTree, {
    namedToggle: true,
    selectorBack: false,
    closedSymbol: '&#8862; &#x1f5c0;',
    openedSymbol: '&#8863; &#x1f5c1;',
    collapseAll: 'Collapse all',
    expandAll: 'Expand all',
    collapsed: false,
  });
  // console.log(layerControl.value.includes('All events'));
  map.value.addControl(layerControl);
  layerControl.addOverlay(clubs.value.layer, clubs.value.label, true);
  // layerControl.value.addOverlay(eventsToMap, 'all Events');
  */
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
