<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/badge.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './status-badge.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Status badge',
  paused: false,
});
const root = ref<HTMLElement | null>(null);
const active = ref(false);
const reduced = ref(true);
const uid = useId();
let lifecycle: ReturnType<typeof observeMotion> | undefined;
onMounted(() => {
  if (root.value)
    lifecycle = observeMotion(
      root.value,
      (state) => {
        active.value = state.active;
        reduced.value = state.reduced;
      },
      props.paused,
    );
});
watch(
  () => props.paused,
  (value) => lifecycle?.setPaused(Boolean(value)),
);
onBeforeUnmount(() => lifecycle?.destroy());
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="status-badge">
    <div class="adapt-status" role="status">
      <i aria-hidden="true" /><span>{{ props.label }}</span
      ><small>Operational · demo</small>
    </div>
  </div>
</template>
