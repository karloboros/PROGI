import { createRouter, createWebHistory } from 'vue-router';
import ClubView from '@/components/club/ClubView.vue';
import CourseList from '@/components/course/CourseList.vue';
import CourseView from '@/components/course/CourseView.vue';
import Home from '@/components/home/HomePage.vue';
import Landing from '@/components/landing/LandingPage.vue';
import ProfileView from '@/components/auth/ProfileView.vue';
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
    path: '/club/:id',
    name: 'Club',
    component: ClubView,
    props: route => ({ clubId: Number(route.params.id) }),
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: CourseView,
    props: route => ({ courseId: Number(route.params.id) }),
  },
  {
    path: '/courses/:id?',
    name: 'CourseList',
    component: CourseList,
    props: route => ({ clubId: Number(route.params.id) }),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
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

  const isLandingRoute = to.name === 'Landing' || to.name === 'Club';
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
