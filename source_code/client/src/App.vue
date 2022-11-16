<template>
  <n-config-provider class="ples-provider" :theme="currentTheme.theme">
    <n-global-style />
    <n-space class="ples-nav" align="center">
      <n-affix :top="0">
        <n-button @click="switchTheme" text style="font-size: 24px">
          <n-icon>
            <component :is="currentTheme.icon" />
          </n-icon>
        </n-button>
      </n-affix>
    </n-space>

    <n-message-provider>
      <n-space class="ples-main" align="center" justify="center" item-style="width: 100%">
        <router-view />
      </n-space>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { darkTheme, lightTheme } from 'naive-ui';
import { Moon, SunnyOutline as Sun } from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

const themeIndex = ref(useStorage('themeIndex', 0));
const themes = [
  { theme: darkTheme, icon: Sun },
  { theme: lightTheme, icon: Moon },
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
</style>
