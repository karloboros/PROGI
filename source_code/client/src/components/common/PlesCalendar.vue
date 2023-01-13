<template>
  <n-space align="center" justify="center" item-style="width: 100%">
    <Qalendar :events="events" :config="config" />
  </n-space>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { formatDate } from '@/utils';
import { Qalendar } from 'qalendar';

const config = {
  defaultMode: 'month',
};

const props = defineProps({
  lessons: { type: Array, default: () => [] },
});

const events = ref([]);

watchEffect(() => {
  const data = props.lessons.map(({ id, startTime, endTime, location }) => {
    const title = 'Lesson';
    const start = formatDate(startTime);
    const end = formatDate(endTime);
    const time = { start, end };
    const color = 'yellow';
    return { id, title, location, time, color };
  });
  events.value = data;
});
</script>

<style>
.event-flyout__info-wrapper {
  background-color: var(--n-color) !important;
}
.calendar-header__mode-options {
  background-color: var(--n-color) !important;
}
.date-picker__week-picker {
  background-color: var(--n-color) !important;
}
</style>
