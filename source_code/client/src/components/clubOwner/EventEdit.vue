<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card title="Event" size="huge">
      <template #header-extra>
        <n-button @click="confirm" type="error">Delete event</n-button>
      </template>
      <event-create v-if="event" :initial-values="event" />
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { eventApi } from '@/api';
import EventCreate from '@/components/clubOwner/EventCreate.vue';
import { toDatePicker } from '@/utils';
import { useRoute } from 'vue-router';

const message = useMessage();
const dialog = useDialog();

const route = useRoute();
const { id } = route.params;

const event = ref(null);

onMounted(async () => {
  const data = await eventApi.fetchById(id);
  const { name, description, image, startTime, club, dances, location } = data;
  const dancesToSend = dances.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
  event.value = {
    name,
    description,
    image,
    startTime: toDatePicker(startTime),
    coordinates: location.coordinates,
    clubName: club.name,
    dances: dancesToSend,
    locationName: location.name,
  };
  console.log(event.value);
});

const confirm = () => {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure you want to delete this event. This is irreversible!',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: remove,
  });
};

const remove = async () => {
  try {
    await eventApi.remove(id);
    message.success('Successfully deleted');
  } catch (err) {
    message.error(err.response.data.message || err);
  }
};
</script>
