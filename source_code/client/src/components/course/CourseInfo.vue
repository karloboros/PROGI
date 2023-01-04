<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 60%">
    <n-card title="Course info" size="huge">
      <div>
        <h2>{{ course.name }}</h2>
        <p>Klub: {{ course.clubName }}</p>
        <p>Lokacija: {{ course.locationName }}</p>
        <p>Ples: {{ course.danceName }}</p>
        <p>Trener: {{ course.trainerName }}</p>
        <p v-if="course.capacity">Kapacitet polaznika: {{ course.capacity }}</p>
        <p v-if="course.minAge">Min dob: {{ course.minAge }}</p>
        <p v-if="course.maxAge">Max dobi: {{ course.maxAge }}</p>
        <p v-if="course.gender">Spol: {{ course.gender }}</p>
        <p>Krajnji rok prijave: {{ course.applicationDeadline }}</p>
        <p>Opis:</p>
        <p>{{ course.description }}</p>
        <p v-if="course.additionalRules">Dodatne infomacije: {{ course.additionalRules }}</p>
      </div>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import { useRoute } from 'vue-router';

const course = ref([]);
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  const data = await courseApi.fetchById(id);
  course.value = {
    id: data.id,
    name: data.name,
    description: data.description,
    capacity: data.capacity,
    minAge: data.minAge,
    maxAge: data.maxAge,
    gender: data.gender,
    applicationDeadline: new Date(data.applicationDeadline).toLocaleDateString(),
    additionalRules: data.additionalRules,
    clubName: data.club.name,
    danceName: data.dance.name,
    locationName: data.location.name,
    trainerName: 'ime',
  };
});

/*
const course = {
  name: 'Ples neki',
  locationName: 'FER',
  danceName: 'Samba',
  description: 'Plesat ćemo sambu i učiti nešto novo blabla.',
  capacity: 20,
};
*/
</script>
