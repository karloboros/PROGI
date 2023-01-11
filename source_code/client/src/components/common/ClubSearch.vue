<template>
  <n-card title="Search for clubs" size="huge">
    <n-form-item path="clubs">
      <n-select
        v-if="!loadingInitial"
        v-model:value="values.clubId"
        @search="handleSearch"
        filterable
        placeholder="Search Clubs"
        :options="clubsOp"
        :loading="loading"
        clearable
      />
    </n-form-item>
    <n-form-item>
      <n-button @click="viewClubDetails(values.clubId)">View details</n-button>
    </n-form-item>
  </n-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const loadingInitial = ref(true);
const clubs = ref([]);
const clubsOp = ref([]);

const initialValue = {
  clubId: [],
};

const values = ref(initialValue);

onMounted(async () => {
  const clubsData = await clubApi.fetchAll();
  clubs.value = clubsData.map(club => ({
    label: club.name,
    value: club.id,
  }));

  loadingInitial.value = false;
});

const handleSearch = query => {
  if (!query.length) {
    clubsOp.value = [];
    return;
  }
  loading.value = true;
  clubsOp.value = clubs.value.filter(item => ~item.label.indexOf(query));
  loading.value = false;
};

const viewClubDetails = id => {
  router.push({
    name: 'ClubInfo',
    params: { id },
  });
};
</script>
