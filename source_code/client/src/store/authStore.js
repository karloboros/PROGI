import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const useAuthStore = defineStore('auth', () => {
  const user = ref(useStorage('user', {}));

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  const setUser = userToSet => {
    user.value = userToSet;
  };

  return { user, isLoggedIn, setUser };
});

export default useAuthStore;
