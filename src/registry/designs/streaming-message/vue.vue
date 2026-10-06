<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './streaming-message.css';
const props = withDefaults(defineProps<{ paused?: boolean; text?: string }>(), {
  paused: false,
  text: 'Great things are built together. Start with a small idea, add a little care, and share what you learn.',
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
const length = ref(0);
watch(
  () => props.text,
  () => (length.value = 0),
);
watch([active, () => props.text], (_, __, cleanup) => {
  if (!active.value) return;
  const timer = setInterval(() => {
    length.value = Math.min(length.value + 2, props.text.length);
    if (length.value === props.text.length) clearInterval(timer);
  }, 45);
  cleanup(() => clearInterval(timer));
});
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="streaming-message">
    <div class="bw-panel bw-message">
      <p class="bw-caption">An idea, taking shape</p>
      <p class="bw-description">
        <span class="bw-sr-only">{{ props.text }}</span
        ><span aria-hidden="true"
          >{{ reduced ? props.text : props.text.slice(0, length) }}<span class="bw-caret"
        /></span>
      </p>
    </div>
  </div>
</template>
