import { createRouter, createWebHistory } from 'vue-router';
import AddDance from '@/components/admin/AddDance.vue';
import ClubApproval from '@/components/admin/ClubApproval.vue';
import DanceView from '@/components/admin/DanceView.vue';
import Home from '@/components/home/HomePage.vue';
import ListDances from '@/components/admin/ListDances.vue';
import ProfileView from '@/components/profile/ProfileView.vue';
import { Role } from '@/constants';
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
    path: '/admin/dances/create',
    name: 'Add dance',
    meta: { role: Role.Administrator },
    component: AddDance,
  },
  {
    path: '/admin/dances/all',
    name: 'List dances',
    meta: { role: Role.Administrator },
    component: ListDances,
  },
  {
    path: '/admin/dances/edit/:id',
    name: 'Edit dance',
    meta: { role: Role.Administrator },
    component: DanceView,
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { role: Role.Administrator },
    component: ClubApproval,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
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
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isLoggedIn;
  const isAdmin = authStore.isAdmin;
  const isAuthRoute = to.name === 'Auth';
  const isAdminRoute = to.meta.role === Role.Administrator;

  if (!isLoggedIn && !isAuthRoute) {
    return { name: 'Auth' };
  }

  if (isLoggedIn && isAuthRoute) {
    return defaultRoute;
  }

  if (isAdminRoute && !isAdmin) {
    return defaultRoute;
  }
});

export default router;
