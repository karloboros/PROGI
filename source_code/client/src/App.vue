<template>
  <n-config-provider class="ples-provider" :theme="currentTheme.theme">
    <n-global-style />
    <ples-nav @switch="switchTheme" :icon="currentTheme.icon" />
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
import PlesNav from '@/components/layout/PlesNav.vue';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

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

.ples-main {
  height: 100%;
}
</style>

<style>
#app {
  height: 100vh;
}

.m-12 {
  margin: 12px;
}

.m-0 {
  margin: 0;
}

.d-none {
  display: none;
}
</style>
