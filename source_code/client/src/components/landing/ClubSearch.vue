<template>
  <n-card title="Search for clubs" size="huge" align="center">
    <n-select
      v-if="finishedInitialLoad"
      @search="searchClubs"
      @update:value="redirectToClub"
      :options="options"
      :loading="isLoading"
      placeholder="Browse clubs..."
      filterable
      clearable
    />
  </n-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { debounce } from 'lodash';
import { useRouter } from 'vue-router';

const router = useRouter();

const finishedInitialLoad = ref(false);
const isLoading = ref(false);
const clubs = ref([]);
const options = ref([]);

const searchClubs = debounce(query => {
  if (!query.length) return (options.value = []);
  isLoading.value = true;
  options.value = clubs.value.filter(item => ~item.label.toLowerCase().indexOf(query.toLowerCase()));
  isLoading.value = false;
}, 500);

const redirectToClub = id => {
  router.push({ name: 'Club', params: { id } });
};

onMounted(async () => {
  const data = await clubApi.fetchAll();
  clubs.value = data.map(({ name: label, id: value }) => ({ label, value }));
  finishedInitialLoad.value = true;
});
</script>
