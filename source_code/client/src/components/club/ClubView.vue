<template>
  <ples-view :title="title" :data="club" class="py-3">
    <template #header-extra>
      <n-button @click="router.push({ name: 'CourseList', params: { id: clubId } })" type="warning" secondary>
        Available courses
      </n-button>
    </template>
    <n-space vertical>
      <club-map :location="clubLocation" />
      <n-space v-if="shouldDisplayApply" align="center" style="margin-top: 32px">
        <n-h4 style="margin: 0">Want to be a trainer? </n-h4>
        <n-button @click="showModal = true" type="warning" text>Apply for a trainer position at this club</n-button>
      </n-space>
    </n-space>
  </ples-view>
  <n-modal v-model:show="showModal">
    <club-trainer-apply @applied="applied" :club-id="clubId" />
  </n-modal>
</template>

<script setup>
import { clubApi, trainerApplicationApi } from '@/api';
import { onMounted, ref } from 'vue';
import ClubMap from './ClubMap.vue';
import ClubTrainerApply from './ClubTrainerApply.vue';
import PlesView from '@/components/common/PlesView.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  clubId: { type: Number, required: true },
});

const router = useRouter();
const title = ref('');
const club = ref(null);
const clubLocation = ref(null);
const showModal = ref(false);
const shouldDisplayApply = ref(false);

const applied = () => {
  showModal.value = false;
  shouldDisplayApply.value = false;
};

const fetchClub = async () => {
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
};

const fetchTrainerApplicationStatus = async () => {
  const trainerApplication = await trainerApplicationApi.fetchByClubId(props.clubId);
  shouldDisplayApply.value = !trainerApplication;
};

onMounted(async () => {
  await fetchClub();
  await fetchTrainerApplicationStatus();
});
</script>
