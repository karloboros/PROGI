<template>
  <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
    <n-form-item label="Start Time" path="startTime">
      <n-date-picker v-model:value="values.startTime" type="datetime" />
    </n-form-item>
    <n-form-item label="End Time" path="endTime">
      <n-date-picker v-model:value="values.endTime" type="datetime" />
    </n-form-item>
    <n-form-item v-if="!isCreateForm">
      <n-button type="primary" attr-type="submit">Create lesson</n-button>
    </n-form-item>
    <n-form-item v-else>
      <n-button type="primary" attr-type="submit">Save changes</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { lessonApi } from '@/api';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { validationRules } from '@/utils';

const emit = defineEmits(['saved']);

const props = defineProps({
  courseId: { type: Number, default: null },
  initialValues: {
    type: Object,
    default: () => ({
      startTime: null,
      endTime: null,
    }),
  },
});

const isCreateForm = computed(() => !!props.initialValues.startTime);

const { dateRequired } = validationRules;
const rules = {
  startTime: dateRequired,
  endTime: dateRequired,
};

const values = ref(props.initialValues);
const formRef = ref(null);
const route = useRoute();

const message = useMessage();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        if (!props.courseId) {
          await lessonApi.edit({ ...values.value, id: route.params.id });
        } else {
          await lessonApi.create({ ...values.value, courseId: props.courseId });
        }
        message.success('Success');
        emit('saved');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};
</script>
