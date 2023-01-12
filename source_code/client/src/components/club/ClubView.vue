<template>
  <ples-view :title="title" :data="club" class="py-3">
    <club-map :location="clubLocation" />
  </ples-view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import ClubMap from './ClubMap.vue';
import PlesView from '@/components/common/PlesView.vue';

const props = defineProps({
  routeId: { type: Number, required: true },
});

const title = ref('');
const club = ref(null);
const clubLocation = ref(null);

onMounted(async () => {
  const { name, phone, email, description, owner, location, dances } = await clubApi.fetchByIdWithDances(props.routeId);
  title.value = name;
  clubLocation.value = location;
  club.value = [
    { label: 'Phone', value: phone },
    { label: 'Email', value: email },
    { label: 'Description', value: description },
    { label: 'Owner', value: owner.fullName },
    { label: 'Location', value: location.name },
    { label: 'Dances', value: dances },
  ];
});
</script>
