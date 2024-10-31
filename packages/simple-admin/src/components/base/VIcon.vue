<template>
  <Icon :icon="icon" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import iconConfig, { type IconConfigKey } from '@/config/icon';

type Props = {
  icon: string;
};
const props = defineProps<Props>();

const icon = computed(() => iconConfig[props.icon as IconConfigKey]);
</script>
<style lang="scss" scoped></style>
