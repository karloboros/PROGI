<template>
  <n-space align="center" justify="center" item-style="width: 60%" class="h-100">
    <template v-if="!data">
      <n-card>
        <n-layout>
          <n-layout-content v-for="item in data" :key="item">
            <n-skeleton text :repeat="2" style="width: 60%" />
          </n-layout-content>
        </n-layout>
      </n-card>
    </template>
    <n-card v-else :title="title">
      <n-layout>
        <n-layout-content v-for="{ label, value } in data" v-show="!!value" :key="label">
          <n-h4>{{ label }}:</n-h4>
          <n-tag v-if="!Array.isArray(value)" checkable disabled>{{ value }}</n-tag>
          <n-tag v-for="name in value" v-else :key="name" checkable disabled>{{ name }}</n-tag>
        </n-layout-content>
        <n-layout-content>
          <slot></slot>
        </n-layout-content>
      </n-layout>
    </n-card>
  </n-space>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  data: { type: Array, default: () => [] },
});
</script>

<style scoped>
.n-layout,
.n-layout-content {
  background-color: transparent !important;
  padding: 16px 8px;
}

.n-layout-content h4 {
  display: inline;
}

.n-tag {
  cursor: text !important;
}
</style>
