<template>
  <n-config-provider class="ples-provider" :theme="currentTheme.theme">
    <n-global-style />
    <n-space class="ples-nav" align="center">
      <n-affix :top="0">
        <n-button @click="switchTheme" type="warning" text style="font-size: 24px">
          <n-icon class="m-12">
            <component :is="currentTheme.icon" />
          </n-icon>
        </n-button>
        <n-button v-if="isAuthRoute" @click="goHome" type="warning" text style="font-size: 24px">
          <n-icon>
            <component :is="currentTheme.homeIcon" />
          </n-icon>
        </n-button>
      </n-affix>
    </n-space>

    <n-dialog-provider>
      <n-message-provider>
        <n-space class="ples-main" align="center" justify="center" item-style="width: 100%">
          <router-view />
        </n-space>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { darkTheme, lightTheme } from 'naive-ui';
import {
  HomeOutline as HomeDarkIcon,
  Home as HomeLightIcon,
  Moon as MoonIcon,
  SunnyOutline as SunIcon,
} from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';

const router = useRouter();

const isAuthRoute = computed(() => {
  const { name } = router.currentRoute.value;
  return name !== 'Auth' && name !== 'Home';
});

const goHome = () => {
  router.push({ name: 'Home' });
};

const themeIndex = ref(useStorage('themeIndex', 0));
const themes = [
  { theme: darkTheme, icon: SunIcon, homeIcon: HomeDarkIcon },
  { theme: lightTheme, icon: MoonIcon, homeIcon: HomeLightIcon },
];

const currentTheme = computed(() => themes[themeIndex.value]);

const switchTheme = () => {
  themeIndex.value = (themeIndex.value + 1) % 2;
};
</script>

<style scoped>
.ples-provider {
  height: 100%;
}
.ples-nav {
  height: 36px;
}

.ples-main {
  height: calc(100% - 36px);
}
</style>

<style>
#app {
  height: 100vh;
}

.m-12 {
  margin: 12px;
}
</style>
