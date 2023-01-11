<template>
  <n-space align="center" justify="center" item-style="width: 60%">
    <template v-if="!club"> <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" /> </template>
    <template v-else>
      <n-card title="Club info" size="huge">
        <n-layout>
          <n-h1>
            <n-text>
              {{ club.name }}
            </n-text>
          </n-h1>
          <n-layout-content content-style="padding: 24px;"> Phone: {{ club.phone }} </n-layout-content>
          <n-layout-content content-style="padding: 24px;"> Email: {{ club.email }} </n-layout-content>
          <n-layout-content content-style="padding: 24px;"> Description: {{ club.description }} </n-layout-content>
          <n-layout-content content-style="padding: 24px;"> Owner: {{ club.owner }} </n-layout-content>
          <n-layout-content content-style="padding: 24px;"> Location: {{ club.address }} </n-layout-content>
        </n-layout>
      </n-card>
    </template>
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
  const data = await clubApi.fetchById(id);
  club.value = {
    ...data,
    address: data.location.name,
    owner: data.owner.fullName,
  };
});
</script>

<style>
n-card {
  margin-top: 10px;
}
.n-layout {
  background-color: rgb(24, 24, 28);
}
.n-layout-content {
  font-size: 20px;
}
</style>
