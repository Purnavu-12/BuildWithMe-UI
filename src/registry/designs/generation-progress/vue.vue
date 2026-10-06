<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './generation-progress.css';
const props = withDefaults(defineProps<{ paused?: boolean }>(), { paused: false });
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
const progress = ref(0);
const value = computed(() => (reduced.value ? 100 : progress.value));
const steps = ['Understanding your idea', 'Bringing it together', 'Ready to make it yours'];
watch([active, () => progress.value === 0], (_, __, cleanup) => {
  if (!active.value) return;
  const timer = setInterval(() => {
    progress.value = Math.min(progress.value + 2, 100);
    if (progress.value === 100) clearInterval(timer);
  }, 120);
  cleanup(() => clearInterval(timer));
});
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="generation-progress">
    <div class="bw-panel bw-progress">
      <p class="bw-caption">Local generation demo</p>
      <p class="bw-description">{{ steps[value === 100 ? 2 : value > 40 ? 1 : 0] }}</p>
      <div
        role="progressbar"
        aria-label="Generation"
        :aria-valuenow="value"
        :aria-valuemin="0"
        :aria-valuemax="100"
        class="bw-progress-track"
      >
        <span :style="{ width: `${value}%` }" />
      </div>
      <div class="bw-progress-footer">
        <span>{{ value }}%</span><button type="button" @click="progress = 0">Restart ↗</button>
      </div>
    </div>
  </div>
</template>
