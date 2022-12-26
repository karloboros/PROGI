<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-calendar
      v-model:value="value"
      @update:value="handleUpdateValue"
      #="{ year, month, date }"
      :is-date-disabled="isDateDisabled"
    >
      {{ year }}-{{ month }}-{{ date }}
    </n-calendar>
  </n-space>
</template>

<script setup>
import { addDays, isYesterday } from 'date-fns/esm';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();

const value = {
  value: ref(addDays(Date.now(), 1).valueOf()),
  handleUpdateValue(_, { year, month, date }) {
    message.success(`${year}-${month}-${date}`);
  },
  isDateDisabled(timestamp) {
    if (isYesterday(timestamp)) {
      return true;
    }
    return false;
  },
};
</script>
