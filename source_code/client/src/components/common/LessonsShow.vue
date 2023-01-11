<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <Qalendar :events="events" />
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import { lessonApi } from '@/api';
import { Qalendar } from 'qalendar';
import { useRoute } from 'vue-router';

const route = useRoute();
const events = ref([]);
const courseId = route.params.courseId;

onMounted(async () => {
  const data = await lessonApi.fetchAll(courseId);
  for (const lesson of data) {
    let date = new Date(lesson.startTime);
    const startTime = format(date, 'yyyy-dd-MM hh:mm');
    date = new Date(lesson.endTime);
    const endTime = format(date, 'yyyy-dd-MM hh:mm');
    lesson.value = {
      title: lesson.course.name,
      time: {
        start: startTime,
        end: endTime,
      },
      topic: 'Capacity: ' + lesson.course.capacity,
      description: lesson.course.description,
      id: lesson.id,
      color: 'blue',
      disableDnD: ['month', 'week', 'day'],
      disableResize: ['week', 'day'],
    };
    events.value.push(lesson.value);
  }
});
</script>

<style>
.event-flyout__info-wrapper {
  background-color: black;
}
.calendar-header__mode-options {
  background-color: black !important;
}
.date-picker__week-picker {
  background-color: black !important;
}
</style>
