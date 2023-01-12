<template>
  <ples-view :title="title" :data="club" class="py-3">
    <template #header-extra>
      <n-button @click="router.push({ name: 'CourseList', params: { id: clubId } })" type="warning">
        Available courses
      </n-button>
    </template>
    <club-map :location="clubLocation" />
  </ples-view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import ClubMap from './ClubMap.vue';
import PlesView from '@/components/common/PlesView.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  clubId: { type: Number, required: true },
});

const router = useRouter();
const title = ref('');
const club = ref(null);
const clubLocation = ref(null);

onMounted(async () => {
  const { name, phone, email, description, owner, location, dances } = await clubApi.fetchByIdWithDances(props.clubId);
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
