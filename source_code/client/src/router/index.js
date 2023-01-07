import { createRouter, createWebHistory } from 'vue-router';
import ClubApproval from '@/components/admin/ClubApproval.vue';
import CreateApplication from '@/components/trainerApplication/CreateApplication.vue';
import DanceCreate from '@/components/admin/DanceCreate.vue';
import DanceEdit from '@/components/admin/DanceEdit.vue';
import DancesList from '@/components/admin/DancesList.vue';
import EventCreate from '@/components/clubOwner/EventCreate.vue';
import Home from '@/components/home/HomePage.vue';
import PendingApplications from '@/components/trainerApplication/PendingApplications.vue';
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
    name: 'AddDance',
    meta: { role: Role.Administrator },
    component: DanceCreate,
  },
  {
    path: '/dances/all',
    name: 'ListDances',
    meta: { role: Role.Administrator },
    component: DancesList,
  },
  {
    path: '/dances/edit/:id',
    name: 'EditDance',
    meta: { role: Role.Administrator },
    component: DanceEdit,
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { role: Role.Administrator },
    component: ClubApproval,
  },
  {
    path: '/events/create',
    name: 'AddEvent',
    meta: { role: Role.ClubOwner },
    component: EventCreate,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/trainer-applications/get-pending/:clubId',
    name: 'PendingApplications',
    component: PendingApplications,
  },
  {
    path: '/trainer-applications',
    name: 'CreateApplication',
    component: CreateApplication,
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
