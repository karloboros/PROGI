<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 90%">
    <n-card title="Course info" size="huge">
      <div>
        <h2>{{ course.name }}</h2>
        <p>Lokacija: {{ course.locationName }}</p>
        <p>Ples: {{ course.danceName }}</p>
        <p>Kapacitet polaznika: {{ course.capacity }}</p>
        <p>{{ course.description }}</p>
      </div>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// import { courseApi } from '@/api';

const course = ref();

const getInfo = async () => {
  // course.value = await courseApi.fetchById();
  course.value = {
    name: 'Ples neki',
    locationName: 'FER',
    danceName: 'Samba',
    description: 'Plesat ćemo sambu i učiti nešto novo blabla.',
    capacity: 20,
  };
};

onMounted(() => {
  getInfo();
});
</script>
