<template>
  <n-space class="container" align="center" justify="center" item-style="width: 80%">
    <n-card :title="title" size="huge">
      <n-skeleton v-if="loading" text :repeat="2" />
      <n-data-table v-else :columns="columns" :data="data" :bordered="false" />
    </n-card>
  </n-space>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  loading: { type: Boolean, required: true },
  columns: { type: Array, required: true },
  data: { type: Array, required: true },
});
</script>

<style scoped>
.container ::v-deep(.n-data-table-th),
.container ::v-deep(.n-data-table-td) {
  white-space: nowrap;
}
</style>
