<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './spotlight-card.css';
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
function move(event: PointerEvent) {
  if (!active.value) return;
  const el = event.currentTarget as HTMLElement;
  const box = el.getBoundingClientRect();
  el.style.setProperty('--x', `${event.clientX - box.left}px`);
  el.style.setProperty('--y', `${event.clientY - box.top}px`);
}
function reset(event: PointerEvent) {
  const el = event.currentTarget as HTMLElement;
  el.style.setProperty('--x', '50%');
  el.style.setProperty('--y', '50%');
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="spotlight-card">
    <div class="bw-panel bw-spotlight" @pointermove="move" @pointerleave="reset">
      <slot
        ><p class="bw-caption">A little unexpected</p>
        <h3 class="bw-title">Follow your curiosity.</h3>
        <p class="bw-description">The best ideas start with a little exploration.</p></slot
      >
    </div>
  </div>
</template>
