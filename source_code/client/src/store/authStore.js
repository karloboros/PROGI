import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

const useAuthStore = defineStore('auth', () => {
  const user = ref(useStorage('user', {}));

  const setUser = userToSet => {
    user.value = userToSet;
  };

  return { user, setUser };
});

export default useAuthStore;
