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
    <n-form-item label="Select how you want to see dances on map: " path="filter">
      <n-space vertical>
        <n-select v-for="filter in values.filters" :key="filter.key" v-model:value="filter.name"></n-select>
      </n-space>
    </n-form-item>
    <n-form-item>
      <div id="app" class="container mt-3 mt-sm-5">
        <div class="row">
          <div
            class="col-md-9 leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
          >
            <div id="map" class="map"></div>
          </div>
        </div>
      </div>
    </n-form-item>
    <n-form-item>
      <n-space vertical>
        <n-li v-for="event in values.events" :key="event.id" v-model:value="event.name"></n-li>
      </n-space>
    </n-form-item>
    {{ events }}
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

const map = ref(null);

const initMap = () => {
  map.value = L.map('map').setView(view, 12);
  L.tileLayer(mapBackground, { attribution }).addTo(map.value);
};

const initialValues = {
  username: '',
  password: '',
  filters: [
    { name: 'Clubs', key: '1' },
    { name: 'Type of Dance', key: '2' },
  ],
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

const events = ref([]);
const eventsToMap = L.layerGroup();

onMounted(async () => {
  initMap();
  const data = await authApi.fetchEventLocation();
  for (const event of data) {
    // eslint-disable-next-line prettier/prettier
    event.value = { name: event.name, description: event.description, image: event.image, clubId: event.clubId, locationId: event.locationId, location: event.location, locationName: event.location.name, coordinates: event.location.coordinates };
    console.log(event.value);
    events.value.push(event);
    const coords = event.value.coordinates.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    eventsToMap.addLayer(L.marker(L.latLng(x, y)).bindPopup(event.value.locationName));
  }
  console.log(eventsToMap);
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
