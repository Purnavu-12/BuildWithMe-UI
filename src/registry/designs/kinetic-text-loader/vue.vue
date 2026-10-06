<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/kinetic-text-loader.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './kinetic-text-loader.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Kinetic text loader',
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
  <div ref="root" class="bw-demo" :data-active="active" data-component="kinetic-text-loader">
    <div class="adapt-kinetic" role="status" :aria-label="props.label">
      <span aria-hidden="true">BUILD · SHIP · REMIX · </span
      ><span aria-hidden="true">SOURCE · OPEN · YOURS · </span>
    </div>
  </div>
</template>
