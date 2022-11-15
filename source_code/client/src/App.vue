<template>
  <n-config-provider :theme="currentTheme.theme">
    <n-global-style />
    <n-space class="ples-navigation" align="center" justify="end">
      <n-affix :top="0">
        <n-button @click="switchTheme" text style="font-size: 24px">
          <n-icon>
            <component :is="currentTheme.icon" />
          </n-icon>
        </n-button>
      </n-affix>
    </n-space>

    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { darkTheme, lightTheme } from 'naive-ui';
import { Moon, SunnyOutline as Sun } from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const themeIndex = ref(0);
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
.ples-navigation {
  height: 36px;
}
</style>
