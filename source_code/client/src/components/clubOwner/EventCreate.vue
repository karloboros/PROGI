<template>
  <n-space align="center" justify="center" item-style="width: 80%">
    <n-card style="width: 80%" title="Create event" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
        <n-form-item label="Event name" path="name">
          <n-input v-model:value="values.name" placeholder="Event name..." />
        </n-form-item>
        <n-form-item label="Description" path="description">
          <n-input v-model:value="values.description" type="textarea" placeholder="Description..." />
        </n-form-item>
        <n-form-item label="Event image" path="image">
          <ples-file-upload @update="update" @error="error" accept="image/png, image/jpeg" />
        </n-form-item>
        <n-form-item label="Club" path="club">
          <n-select v-model:value="values.club" :options="clubs" :loading="loading" placeholder="Club..." />
        </n-form-item>
        <n-form-item label="Address" path="address">
          <n-input v-model:value="values.address" placeholder="Address..." />
        </n-form-item>
        <n-form-item label="Dances" path="dances">
          <n-select
            v-model:value="values.dances"
            :options="dancesOp"
            :loading="loading"
            multiple
            placeholder="Dance..."
          />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" attr-type="submit">Create</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-space>
</template>

<script setup>
import { clubApi, danceApi, eventApi } from '@/api';
import { onMounted, ref } from 'vue';
import PlesFileUpload from '@/components/common/PlesFileUpload.vue';
import { useAuthStore } from '@/store';
import { useMessage } from 'naive-ui';
import { validationRules } from '@/utils';

const emit = defineEmits(['created']);

const initialValues = {
  name: '',
  address: '',
  description: '',
  club: null,
  image: '',
  dances: [],
};

const { required } = validationRules;
const rules = {
  name: required,
  address: required,
  description: required,
  club: required,
  image: required,
};
const authStore = useAuthStore();

const user = ref({ ...authStore.user });

const loading = ref(true);
const dancesOp = ref([]);
const clubs = ref([]);

onMounted(async () => {
  dancesOp.value = await danceApi.fetchAll();
  dancesOp.value = dancesOp.value.map(v => ({
    label: v.name,
    value: v.name,
  }));

  clubs.value = await clubApi.fetchAll();
  clubs.value = clubs.value
    .map(club => ({ ...club }))
    .filter(club => club.ownerId === user.value.id)
    .map(c => ({
      label: c.name,
      value: c.name,
    }));

  loading.value = false;
});

const values = ref(initialValues);
const formRef = ref(null);

const message = useMessage();

const submit = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        await eventApi.create({ ...values.value });
        message.success('Event successfully created!');
        emit('created');
      } catch (err) {
        message.error(err.response.data.message);
      }
    }
  });
};

const update = image => {
  values.value.image = image;
};

const error = error => {
  message.error(error);
};
</script>
