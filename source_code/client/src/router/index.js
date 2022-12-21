import { createRouter, createWebHistory } from 'vue-router';
import ClubApproval from '@/components/admin/ClubApproval.vue';
import CoursesShow from '@/components/clubowner/CoursesShow.vue';
import Home from '@/components/home/HomePage.vue';
import HomeOwner from '@/components/clubowner/HomeOwner.vue';
import LessonCreate from '@/components/clubowner/LessonCreate.vue';
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
    path: '/admin',
    name: 'Admin',
    meta: { role: Role.Administrator },
    component: ClubApproval,
  },
  {
    path: '/owner',
    name: 'Owner',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: HomeOwner,
  },
  {
    path: '/courses',
    name: 'Courses',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: CoursesShow,
  },
  {
    path: '/lesson-create',
    name: 'LessonCreate',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: LessonCreate,
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
