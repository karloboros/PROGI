<template>
  <component :is="currentComponent" @swap="swap"></component>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import UserLogin from './UserLogin.vue';
import UserRegister from './UserRegister.vue';

const componentIndex = ref(0);
const components = [UserLogin, UserRegister];

const currentComponent = computed(() => components[componentIndex.value]);

const swap = () => {
  componentIndex.value = (componentIndex.value + 1) % 2;
};
</script>
