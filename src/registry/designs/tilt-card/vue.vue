<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './tilt-card.css';
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
  el.style.transform = `perspective(800px) rotateX(${-(event.clientY - box.top - box.height / 2) / 14}deg) rotateY(${(event.clientX - box.left - box.width / 2) / 14}deg)`;
}
function reset(event: PointerEvent) {
  const el = event.currentTarget as HTMLElement;
  el.style.transform = 'none';
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="tilt-card">
    <div class="bw-panel bw-tilt" @pointermove="move" @pointerleave="reset">
      <slot
        ><p class="bw-caption">A new perspective</p>
        <div class="bw-tilt-orbit" aria-hidden="true"></div>
        <h3 class="bw-title">More than a surface.</h3></slot
      >
    </div>
  </div>
</template>
