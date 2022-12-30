<template>
  <n-space class="club-approval" align="center" justify="center" item-style="width: 80%">
    <n-card title="My courses" size="huge">
      <n-data-table :columns="columns" :data="clubs" :pagination="pagination" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
// import { h, onMounted, ref } from 'vue';
import { h } from 'vue';
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const ShowCoursesButton = club => {
  return h(
    NButton,
    {
      secondary: true,
      type: 'primary',
      size: 'small',
      onClick: () => viewCourseDetails(club.id),
    },
    { default: () => 'See Courses' },
  );
};

const columns = [
  { title: 'Club', key: 'name' },
  { title: 'Show courses', key: 'show', render: ShowCoursesButton },
];

const clubs = [{ name: 'Klub1' }, { name: 'Klub2' }];

const viewCourseDetails = id => {
  router.push({
    name: 'CoursesShow',
    params: { id },
  });
};
</script>
