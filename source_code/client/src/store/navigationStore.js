import { defineStore } from 'pinia';
import { ref } from 'vue';

const useNavigationStore = defineStore('navigation', () => {
  const showClubCreateModal = ref(false);

  const toggleShowClubCreateModal = () => {
    showClubCreateModal.value = !showClubCreateModal.value;
  };

  return { showClubCreateModal, toggleShowClubCreateModal };
});

export default useNavigationStore;
