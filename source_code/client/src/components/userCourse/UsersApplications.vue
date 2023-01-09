<template>
    <n-space class="users-applications" align="center" justify="center" item-style="width: 80%">
      <n-card title="Your course applications:" size="huge">
        <n-skeleton v-if="loading" text :repeat="6" />
        <n-data-table v-else :columns="columns" :data="userCourses" :bordered="false" />
      </n-card>
    </n-space>
  </template>
  
  <script setup>
  import { ApprovalStatus, Gender } from '@/constants';
  import { onMounted, ref } from 'vue';
  import { userCourseApi } from '@/api';
  import { useRoute } from 'vue-router';
  
  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Capacity', key: 'capacity' },
    { title: 'Minimal Age Required', key: 'minAge' },
    { title: 'Maximal Age Required', key: 'maxAge' },
    { title: 'Gender Required', key: 'gender' },
    { title: 'Application deadline', key: 'applicationDeadline' },
    { title: 'Additional rules', key: 'additionalRules' },
    { title: 'Approval Status', key: 'approval' },
  ];
  
  const userCourses = ref([]);
  const loading = ref(true);
  const route = useRoute();
  const userId = route.params.userId;
  
  onMounted(async () => {
    const data = await userCourseApi.getYourApplications(userId);
    userCourses.value = data.map(userCourse => ({
      ...userCourse,
      name: userCourse.course.name,
      description: userCourse.course.description,
      capacity: userCourse.course.capacity,
      minAge: userCourse.course.minAge,
      maxAge: userCourse.course.maxAge,
      gender:
        userCourse.course.gender === Gender.Female
          ? 'Only for women'
          : userCourse.course.gender === Gender.Male
          ? 'Only for men'
          : 'Not specified',
      applicationDeadline: userCourse.course.applicationDeadline,
      additionalRules: userCourse.course.additionalRules,
      approval:
        userCourse.status === ApprovalStatus.Approved
          ? 'Approved'
          : userCourse.status === ApprovalStatus.Rejected
          ? 'Rejected'
          : 'Pending',
    }));
  
    loading.value = false;
  });
  </script>
  
  <style scoped>
  .users-applications ::v-deep(.n-data-table-th),
  .users-applications ::v-deep(.n-data-table-td) {
    white-space: nowrap;
  }
  </style>
