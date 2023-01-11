<template>
  <n-card title="Search for clubs" size="huge">
    <n-form-item path="clubs">
      <n-select
        v-if="!initialLoading"
        v-model:value="values.clubId"
        @search="handleSearch"
        @update:value="viewClubDetails(values.clubId)"
        filterable
        placeholder="Search Clubs"
        :options="clubsOp"
        :loading="loading"
        clearable
      />
    </n-form-item>
  </n-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { debounce } from 'lodash';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const initialLoading = ref(true);
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

  initialLoading.value = false;
});

const handleSearch = debounce(query => {
  if (!query.length) {
    clubsOp.value = [];
    return;
  }
  loading.value = true;
  clubsOp.value = clubs.value.filter(item => ~item.label.toLowerCase().indexOf(query.toLowerCase()));
  loading.value = false;
}, 1000);

const viewClubDetails = id => {
  router.push({
    name: 'ClubInfo',
    params: { id },
  });
};
</script>
