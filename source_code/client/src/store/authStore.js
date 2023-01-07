import { computed, ref } from 'vue';
import { authApi } from '@/api';
import { defineStore } from 'pinia';
import { Role } from '@/constants';
import { useStorage } from '@vueuse/core';

const useAuthStore = defineStore('auth', () => {
  const user = ref(useStorage('user', {}));

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  const isAdmin = computed(() => user.value.role === Role.Administrator);

  const isClubOwner = computed(() => user.value.role === Role.ClubOwner);

  const setUser = userToSet => {
    user.value = userToSet;
  };

  const clearUser = () => {
    user.value = {};
  };

  const logout = async router => {
    await authApi.logout();
    clearUser();
    router.push({ name: 'Auth' });
  };

  return { user, isLoggedIn, isAdmin, isClubOwner, setUser, logout };
});

export default useAuthStore;
