<template>
  <n-space align="center" justify="center" item-style="width: 60%">
    <n-card title="Course info" size="huge">
      <n-layout>
        <h2 content-style="padding: 24px;">{{ course.name }}</h2>
        <n-layout-content content-style="padding: 24px;"> Club: {{ course.clubName }} </n-layout-content>
        <n-layout-content content-style="padding: 24px;"> Location: {{ course.locationName }} </n-layout-content>
        <n-layout-content content-style="padding: 24px;"> Trainer: {{ course.trainerName }} </n-layout-content>
        <n-layout-content content-style="padding: 24px;">
          Capacity: {{ course.capacity ? course.capacity : '-' }}
        </n-layout-content>
        <n-layout-content content-style="padding: 24px;">
          Min age: {{ course.minAge ? course.minAge : '-' }}
        </n-layout-content>
        <n-layout-content content-style="padding: 24px;">
          Max age: {{ course.maxAge ? course.maxAge : '-' }}
        </n-layout-content>
        <n-layout-content content-style="padding: 24px;">
          Gender: {{ course.gender ? course.gender : 'all' }}
        </n-layout-content>
        <n-layout-content content-style="padding: 24px;">
          Application deadline: {{ course.applicationDeadline }}
        </n-layout-content>
        <n-layout-content content-style="padding: 24px;">Description: {{ course.description }}</n-layout-content>
        <n-layout-content content-style="padding: 24px;">
          Additional information: {{ course.additionalRules ? course.additionalRules : '-' }}
        </n-layout-content>
      </n-layout>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import { useRoute } from 'vue-router';

const course = ref({});
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
    trainerName: data.trainer.firstName + ' ' + data.trainer.lastName,
  };
});
</script>

<style>
n-card {
  margin-top: 10px;
}
</style>
