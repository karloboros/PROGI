<template>
  <ples-view :title="title" :data="course" class="py-3">
    <n-space vertical>
      <n-image width="100" :src="trainerImage" />
      <ples-calendar :lessons="lessons" class="py-7" />
    </n-space>
  </ples-view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { courseApi } from '@/api';
import { Gender } from '@/constants';
import PlesCalendar from '@/components/common/PlesCalendar.vue';
import PlesView from '@/components/common/PlesView.vue';

const props = defineProps({
  routeId: { type: Number, required: true },
});

const title = ref('');
const course = ref(null);
const trainerImage = ref(null);
const lessons = ref(null);

onMounted(async () => {
  const {
    name,
    description,
    capacity,
    minAge,
    maxAge,
    gender,
    applicationDeadline,
    additionalRules,
    club,
    dance,
    location,
    trainer,
    lessons: lessonsList,
  } = await courseApi.fetchById(props.routeId);
  title.value = name;
  trainerImage.value = trainer.image;
  lessons.value = lessonsList.map(lesson => ({ ...lesson, location: location.name }));
  course.value = [
    { label: 'Description', value: description },
    { label: 'Capacity', value: capacity },
    { label: 'Age group', value: minAge && maxAge ? `${minAge} - ${maxAge}` : null },
    { label: 'Gender', value: Object.keys(Gender)[gender] },
    { label: 'Application deadline', value: new Date(applicationDeadline) },
    { label: 'Additional rules', value: additionalRules },
    { label: 'Club', value: club.name },
    { label: 'Dance', value: dance.name },
    { label: 'Location', value: location.name },
    { label: 'Trainer', value: trainer.fullName },
  ];
});
</script>
