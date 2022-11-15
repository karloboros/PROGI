import { createRouter, createWebHistory } from 'vue-router';
import ClubApproval from '@/components/admin/ClubApproval.vue';
import Home from '@/components/home/HomePage.vue';
import { useAuthStore } from '@/store';
import UserAuth from '@/components/auth/UserAuth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: UserAuth,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: ClubApproval,
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

router.beforeEach((to, from) => {
  const isLoggedIn = useAuthStore().isLoggedIn;
  const isAuthRoute = to.name === 'Auth';

  if (!isLoggedIn && !isAuthRoute) {
    return { name: 'Auth' };
  }

  if (isLoggedIn && isAuthRoute) {
    return defaultRoute;
  }
});

export default router;
