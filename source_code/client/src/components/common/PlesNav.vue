<template>
  <n-affix :top="0" class="ples-nav">
    <n-el tag="div" style="background: var(--card-color)">
      <n-page-header>
        <template #title>
          <n-button @click="router.push({ name: 'Landing' })" text class="ples-title">Ples</n-button>
        </template>
        <template #extra>
          <n-space align="center">
            <slot v-if="isNotAuthRoute">
              <slot v-if="!isLoggedIn">
                <n-button @click="router.push({ name: 'Auth' })" type="warning" text>Login</n-button>
              </slot>
              <slot v-else>
                <nav-trainer v-if="isTrainer" />
                <nav-club-owner v-else-if="isClubOwner" />
                <nav-admin v-else-if="isAdmin" />
                <nav-user v-else />
                <n-button @click="logout" type="warning" text>Logout</n-button>
              </slot>
            </slot>
            <n-button @click="$emit('switch')" type="warning" text style="font-size: 24px">
              <n-icon class="m-12">
                <component :is="icon" />
              </n-icon>
            </n-button>
          </n-space>
        </template>
      </n-page-header>
    </n-el>
  </n-affix>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import NavAdmin from './nav/NavAdmin.vue';
import NavClubOwner from './nav/NavClubOwner.vue';
import NavTrainer from './nav/NavTrainer.vue';
import NavUser from './nav/NavUser.vue';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

defineProps({
  icon: { type: Object, required: true },
});

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const isTrainer = computed(() => authStore.isTrainer);
const isClubOwner = computed(() => authStore.isClubOwner);
const isAdmin = computed(() => authStore.isAdmin);
const isNotAuthRoute = computed(() => router.currentRoute.value.name !== 'Auth');

const logout = () => authStore.logout(router);
</script>

<style scoped>
.ples-nav {
  width: 100%;
  z-index: 10000;
}

.ples-title {
  font-size: 32px;
  padding: 12px;
}

.ples-title > :deep(.n-button__content) {
  font-weight: bold;
}
</style>
