import { createRouter, createWebHistory } from 'vue-router';
import AddDance from '@/components/admin/AddDance.vue';
import AddEvent from '@/components/clubOwner/AddEvent.vue';
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
    path: '/dances/create',
    name: 'Add dance',
    meta: { role: Role.Administrator },
    component: AddDance,
  },
  {
    path: '/dances/all',
    name: 'List dances',
    meta: { role: Role.Administrator },
    component: ListDances,
  },
  {
    path: '/dances/edit/:id',
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
    path: '/events/create',
    name: 'Add Event',
    meta: { role: Role.ClubOwner },
    component: AddEvent,
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
  const isClubOwner = authStore.isClubOwner;
  const isClubOwnerRoute = to.meta.role === Role.ClubOwner;
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

  if (isClubOwnerRoute && !isClubOwner) {
    return defaultRoute;
  }
});

export default router;
