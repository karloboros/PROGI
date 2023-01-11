import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/home/HomePage.vue';
import Landing from '@/components/landing/LandingPage.vue';
import { Role } from '@/constants';
import { useAuthStore } from '@/store';
import UserAuth from '@/components/auth/UserAuth.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: UserAuth,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const defaultRoute = { name: 'Home' };

router.beforeEach((to, _from) => {
  const authStore = useAuthStore();

  const isLandingRoute = to.name === 'Landing';
  const isAuthRoute = to.name === 'Auth';
  const isAdminRoute = to.meta.role === Role.Administrator;
  const isClubOwnerRoute = to.meta.role === Role.ClubOwner;
  const isTrainerRoute = to.meta.role === Role.Trainer;

  const isLoggedIn = authStore.isLoggedIn;
  const isAdmin = authStore.isAdmin;
  const isClubOwner = authStore.isClubOwner;
  const isTrainer = authStore.isTrainer;

  if (!isLandingRoute && !isAuthRoute && !isLoggedIn) {
    return { name: 'Auth' };
  }

  if (isAuthRoute && isLoggedIn) {
    return defaultRoute;
  }

  if (isAdminRoute && !isAdmin) {
    return defaultRoute;
  }

  if (isClubOwnerRoute && !isClubOwner) {
    return defaultRoute;
  }

  if (isTrainerRoute && !isTrainer) {
    return defaultRoute;
  }
});

export default router;
