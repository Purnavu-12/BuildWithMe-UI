<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './metric-sparkline.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Metric sparkline',
  className: '',
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
      false,
    );
});
watch(
  () => false,
  (value) => lifecycle?.setPaused(Boolean(value)),
);
onBeforeUnmount(() => lifecycle?.destroy());
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="metric-sparkline"
  >
    <figure class="bwm-panel bwm-metric">
      <figcaption>{{ props.label }}<small>Weekly velocity · example data</small></figcaption>
      <strong>+24.8%</strong
      ><svg viewBox="0 0 180 54" role="img" :aria-label="`${props.label}: a rising weekly trend`">
        <path d="M2 46 C30 44 34 18 58 30 S92 45 112 22 S146 8 178 4" /></svg
      ><small>7 periods · steady growth</small>
    </figure>
  </div>
</template>
