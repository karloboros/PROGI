import { createRouter, createWebHistory } from 'vue-router';
import ApprovedCourseApplications from '@/components/userCourse/ApprovedCourseApplications.vue';
import ClubApproval from '@/components/admin/ClubApproval.vue';
import ClubEdit from '@/components/admin/ClubEdit.vue';
import ClubOwnerCourseList from '@/components/clubOwner/CourseList.vue';
import ClubsList from '@/components/admin/ClubsList.vue';
import ClubView from '@/components/club/ClubView.vue';
import CourseList from '@/components/course/CourseList.vue';
import CourseView from '@/components/course/CourseView.vue';
import DanceCreate from '@/components/admin/DanceCreate.vue';
import DanceEdit from '@/components/admin/DanceEdit.vue';
import DancesList from '@/components/admin/DancesList.vue';
import EventCreate from '@/components/clubOwner/EventCreate.vue';
import EventEdit from '@/components/clubOwner/EventEdit.vue';
import EventsList from '@/components/clubOwner/EventsList.vue';
import Landing from '@/components/landing/LandingPage.vue';
import PendingCourseApplications from '@/components/userCourse/PendingCourseApplications.vue';
import PendingTrainerApplications from '@/components/trainerApplication/PendingTrainerApplications.vue';
import ProfileView from '@/components/auth/ProfileView.vue';
import { Role } from '@/constants';
import Trainer from '@/components/trainer/TrainerPage.vue';
import { useAuthStore } from '@/store';
import UserAuth from '@/components/auth/UserAuth.vue';
import UserEdit from '@/components/admin/UserEdit.vue';
import UsersList from '@/components/admin/UsersList.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
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
    path: '/admin/dances',
    name: 'DancesList',
    component: DancesList,
  },
  {
    path: '/admin/dances/create',
    name: 'DanceCreate',
    component: DanceCreate,
  },
  {
    path: '/admin/dances/edit/:id',
    name: 'DanceEdit',
    component: DanceEdit,
  },
  {
    path: '/admin/users',
    name: 'UsersList',
    component: UsersList,
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: UserEdit,
  },
  {
    path: '/admin/clubs',
    name: 'ClubsList',
    component: ClubsList,
  },
  {
    path: '/admin/clubs/edit/:id',
    name: 'ClubEdit',
    component: ClubEdit,
  },
  {
    path: '/admin/clubs/pending',
    name: 'ClubApproval',
    component: ClubApproval,
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: Trainer,
  },
  {
    path: '/club-owner/courses/:id',
    name: 'ClubOwnerCourseList',
    component: ClubOwnerCourseList,
    meta: { role: Role.ClubOwner },
    props: route => ({ clubId: Number(route.params.id) }),
  },
  {
    path: '/club-owner/events',
    name: 'EventsList',
    component: EventsList,
    meta: { role: Role.ClubOwner },
  },
  {
    path: '/club-owner/events/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/club-owner/pending-applications/:id',
    name: 'TrainerApplications',
    component: PendingTrainerApplications,
    meta: { role: Role.ClubOwner },
    props: route => ({ clubId: Number(route.params.id) }),
  },
  {
    path: '/club-owner/events/edit/:id',
    name: 'EventEdit',
    component: EventEdit,
  },
  {
    path: '/club-owner/pending-course-applications/:id',
    name: 'PendingCourseApplications',
    component: PendingCourseApplications,
    props: route => ({ courseId: Number(route.params.id) }),
  },
  {
    path: '/club-owner/approved-course-applications/:id',
    name: 'ApprovedCourseApplications',
    component: ApprovedCourseApplications,
    props: route => ({ courseId: Number(route.params.id) }),
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

export const defaultRoute = { name: 'Landing' };

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

  if (isClubOwner && to.name === 'CourseList') {
    return { name: 'ClubOwnerCourseList', params: { id: to.params.id } };
  }
});

export default router;
