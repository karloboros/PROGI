<template>
  <n-space align="center" justify="center" item-style="width: 60%">
    <template v-if="!course"> <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" /> </template>
    <template v-else>
      <n-card title="Course info" size="huge">
        <n-layout>
          <n-h1>
            <n-text>
              {{ course.name }}
            </n-text>
          </n-h1>
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
    </template>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import { useRoute } from 'vue-router';

const course = ref(null);
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  const data = await courseApi.fetchById(id);
  course.value = {
    ...data,
    applicationDeadline: new Date(data.applicationDeadline).toLocaleDateString(),
    clubName: data.club.name,
    danceName: data.dance.name,
    locationName: data.location.name,
    trainerName: data.trainer.fullName,
  };
});
</script>

<style>
n-card {
  margin-top: 10px;
}
.n-layout {
  background-color: rgb(24, 24, 28);
}
.n-layout-content {
  font-size: 20px;
}
</style>
