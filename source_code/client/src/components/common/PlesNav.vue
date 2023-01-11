<template>
  <n-affix :top="0" class="ples-nav">
    <n-page-header>
      <template #title>
        <n-button @click="redirectToLanding" text class="ples-title">Ples</n-button>
      </template>
      <template #extra>
        <n-space align="center">
          <n-button v-if="isLandingRoute" @click="redirectToAuth" type="warning" text>Login</n-button>
          <n-button v-else-if="isNotAuthRoute" @click="logout" type="warning" text>Logout</n-button>
          <n-button @click="$emit('switch')" type="warning" text style="font-size: 24px">
            <n-icon class="m-12">
              <component :is="icon" />
            </n-icon>
          </n-button>
        </n-space>
      </template>
    </n-page-header>
  </n-affix>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

defineProps({
  icon: { type: Object, required: true },
});

const router = useRouter();
const logout = () => useAuthStore().logout(router);
const isLandingRoute = computed(() => router.currentRoute.value.name === 'Landing');
const isNotAuthRoute = computed(() => router.currentRoute.value.name !== 'Auth');

const redirectToLanding = () => {
  router.push({ name: 'Landing' });
};

const redirectToAuth = () => {
  router.push({ name: 'Auth' });
};
</script>

<style scoped>
.ples-nav {
  width: 100%;
}

.ples-title {
  font-size: 32px;
  padding: 12px;
}

.ples-title > :deep(.n-button__content) {
  font-weight: bold;
}
</style>
