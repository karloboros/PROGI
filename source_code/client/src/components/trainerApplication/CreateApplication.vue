<template>
    <n-space class="create-application" align="center" justify="center" item-style="width: 80%">
      <n-form ref="formRef" @submit.prevent="submit" :model="values" :rules="rules">
        <n-form-item label="Motivational letter" path="motivationalLetter">
            <n-input v-model:value="values.motivationalLetter" type="textarea" placeholder="I want to..." />
        </n-form-item>
        <n-form-item label="Certificate" path="certificate">
            <ples-file-upload @update="update" @error="error" accept="application/pdf" />
        </n-form-item>
        
        <n-form-item>
            <n-button type="primary" attr-type="submit">Send application</n-button>
        </n-form-item>
    </n-form>
</n-space>
</template>

<script setup>
  // eslint-disable-next-line sort-imports
  import { trainerApplicationApi, clubApi, authApi } from '@/api';
  import { onMounted, ref } from 'vue';
  //import { computed } from '@vue/reactivity';
  import { useMessage } from 'naive-ui';
  import { useRoute } from 'vue-router';    
  import { validationRules } from '@/utils';
  import PlesFileUpload from '@/components/common/PlesFileUpload.vue';

  const emit = defineEmits(['sent']);
  
  
  const props = defineProps({
      initialValues: {
          type: Object,
          default: () => ({
              motivationalLetter: '',
              certificate: '',
            }),
        },
    });

  /*  
  onMounted(async () => {
    clubs.value = await clubApi.fetchAll();
    console.log(clubs.value);
    clubs.value = clubs.value.map(v => ({
        label: v.name,
        value: v.name,
    }));
  });
*/    
    const { required } = validationRules;
    const rules = {
        motivationalLetter: required,
        certificate: required,
    };
    const message = useMessage();
    const route = useRoute();
    const values = ref(props.initialValues);
    const formRef = ref(null);
    console.log(route.params.id);

    const submit = async () => {
        formRef.value?.validate(async errors => {
            if (!errors) {
                try {
                await trainerApplicationApi.send({ ...values.value, id: route.params.id, clubId: route.params.clubId });  
                    message.success('Success');
                    emit('Sent');
                } catch (err) {
                    message.error(err.message);
                }
            }
        });
    };
  
    
const update = certificate => {
  values.value.certificate = certificate;
};

const error = error => {
  message.error(error);
};

  // eslint-disable-next-line no-unused-vars
  /* const error = error => {
    message.error(error);
  }; */
  </script>
