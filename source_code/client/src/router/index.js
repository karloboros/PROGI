import { createRouter, createWebHistory } from 'vue-router';
import ClubApproval from '@/components/admin/ClubApproval.vue';
import ClubsShow from '@/components/club/ClubsShow.vue';
import CourseCreate from '@/components/clubowner/CourseCreate.vue';
import CourseEdit from '@/components/clubowner/CourseEdit.vue';
import CourseInfo from '@/components/course/CourseInfo.vue';
import CourseMap from '@/components/common/CourseMap.vue';
import CoursesShow from '@/components/clubowner/CoursesShow.vue';
import DanceCreate from '@/components/admin/DanceCreate.vue';
import DanceEdit from '@/components/admin/DanceEdit.vue';
import DancesList from '@/components/admin/DancesList.vue';
import EventCreate from '@/components/clubowner/EventCreate.vue';
import Home from '@/components/home/HomePage.vue';
import HomeOwner from '@/components/clubowner/HomeOwner.vue';
import LessonCreate from '@/components/clubowner/LessonCreate.vue';
import LessonEdit from '@/components/clubowner/LessonEdit.vue';
import LessonsShow from '@/components/common/LessonsShow.vue';
import LessonsShowTable from '@/components/clubowner/LessonsShowTable.vue';
import ProfileView from '@/components/profile/ProfileView.vue';
import { Role } from '@/constants';
import { useAuthStore } from '@/store';
import UserAuth from '@/components/auth/UserAuth.vue';
import UserEdit from '@/components/admin/UserEdit.vue';
import UsersList from '@/components/admin/UsersList.vue';

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
    path: '/admin/users/all',
    name: 'UsersList',
    meta: { role: Role.Administrator },
    component: UsersList,
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    meta: { role: Role.Administrator },
    component: UserEdit,
  },
  {
    path: '/admin/dances/create',
    name: 'DanceAdd',
    meta: { role: Role.Administrator },
    component: DanceCreate,
  },
  {
    path: '/admin/dances/all',
    name: 'DancesList',
    meta: { role: Role.Administrator },
    component: DancesList,
  },
  {
    path: '/admin/dances/edit/:id',
    name: 'DanceEdit',
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
    path: '/lessons/:courseId',
    name: 'Lessons',
    component: LessonsShow,
  },
  {
    path: '/owner',
    name: 'Owner',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: HomeOwner,
  },
  {
    path: '/clubs/all',
    name: 'ClubsShow',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: ClubsShow,
  },
  {
    path: '/owner/courses/:clubId',
    name: 'Courses',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: CoursesShow,
  },
  {
    path: '/owner/courses/create/:clubId',
    name: 'CourseCreate',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: CourseCreate,
  },
  {
    path: '/owner/courses/edit/:id',
    name: 'CourseEdit',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: CourseEdit,
  },
  {
    path: '/lesson/create/:courseId',
    name: 'LessonCreate',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: LessonCreate,
  },
  {
    path: '/lesson/edit/:id',
    name: 'LessonEdit',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: LessonEdit,
  },
  {
    path: '/lesson/:courseId',
    name: 'LessonsShowTable',
    meta: { role: Role.ClubOwner || Role.Administrator },
    component: LessonsShowTable,
  },
  {
    path: '/events/create',
    name: 'EventAdd',
    meta: { role: Role.ClubOwner },
    component: EventCreate,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/courses/all',
    name: 'CourseMap',
    component: CourseMap,
  },
  {
    path: '/courses/:id',
    name: 'CourseInfo',
    component: CourseInfo,
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
