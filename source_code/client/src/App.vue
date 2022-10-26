<template>
  <n-config-provider :theme="theme">
    <router-view />
  </n-config-provider>
</template>

<script setup>
import { lightTheme as theme } from 'naive-ui';
</script>
