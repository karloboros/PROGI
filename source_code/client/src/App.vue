<template>
  <n-config-provider class="ples-provider" :theme="currentTheme.theme">
    <n-global-style />
    <ples-nav @switch="switchTheme" :icon="currentTheme.icon" class="ples-navigation" />
    <n-dialog-provider>
      <n-message-provider>
        <n-space class="ples-main" justify="center" item-style="width: 100%">
          <router-view />
        </n-space>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { darkTheme, lightTheme } from 'naive-ui';
import { Moon as MoonIcon, SunnyOutline as SunIcon } from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';
import PlesNav from '@/components/common/PlesNav.vue';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

const themeIndex = ref(useStorage('themeIndex', 0));
const themes = [
  { theme: darkTheme, icon: SunIcon },
  { theme: lightTheme, icon: MoonIcon },
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

.ples-navigation {
  height: 56px;
}

.ples-main {
  height: calc(100% - 56px);
  padding-top: 56px;
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

.z-1000 {
  z-index: 1000;
}

.h-100 {
  height: 100%;
}

.py-3 {
  padding: 3% 0;
}

.py-7 {
  padding: 7% 0;
}
</style>
