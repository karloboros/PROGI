<template>
  <ples-view :title="title" :data="club" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import PlesView from '@/components/common/PlesView.vue';

const props = defineProps({
  routeId: { type: Number, required: true },
});

const title = ref('');
const club = ref(null);

onMounted(async () => {
  const { name, phone, email, description, owner, location, dances } = await clubApi.fetchByIdWithDances(props.routeId);
  title.value = name;
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

<style scoped>
.n-layout,
.n-layout-content {
  background-color: transparent !important;
  padding: 16px 8px;
}

.n-layout-content h4 {
  display: inline;
}
</style>
