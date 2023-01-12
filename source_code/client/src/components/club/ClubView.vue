<template>
  <n-space align="center" justify="center" item-style="width: 60%" class="h-100">
    <template v-if="!club">
      <n-card>
        <n-layout>
          <n-layout-content>
            <n-skeleton text :repeat="2" style="width: 60%" />
          </n-layout-content>
          <n-layout-content>
            <n-skeleton text :repeat="2" style="width: 70%" />
          </n-layout-content>
          <n-layout-content>
            <n-skeleton text :repeat="2" style="width: 80%" />
          </n-layout-content>
          <n-layout-content>
            <n-skeleton text :repeat="2" style="width: 50%" />
          </n-layout-content>
          <n-layout-content>
            <n-skeleton text :repeat="2" style="width: 80%" />
          </n-layout-content>
        </n-layout>
      </n-card>
    </template>
    <n-card v-else :title="club.name">
      <n-layout>
        <n-layout-content><n-h4>Phone:</n-h4> {{ club.phone }}</n-layout-content>
        <n-layout-content><n-h4>Email</n-h4>: {{ club.email }}</n-layout-content>
        <n-layout-content><n-h4>Description</n-h4>: {{ club.description }}</n-layout-content>
        <n-layout-content><n-h4>Owner</n-h4>: {{ club.owner }}</n-layout-content>
        <n-layout-content><n-h4>Location</n-h4>: {{ club.address }}</n-layout-content>
        <n-layout-content>
          <n-h4>Dances</n-h4>: <n-tag v-for="name in club.dances" :key="name" checkable disabled>{{ name }}</n-tag>
        </n-layout-content>
      </n-layout>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { clubApi } from '@/api';
import { useRoute } from 'vue-router';

const club = ref(null);
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  const data = await clubApi.fetchByIdWithDances(id);
  const address = data.location.name;
  const owner = data.owner.fullName;
  club.value = { ...data, address, owner };
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
