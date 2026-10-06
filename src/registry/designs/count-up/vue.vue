<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { animate } from 'animejs';
import '../../shared/base.css';
import './count-up.css';
const props = withDefaults(defineProps<{ paused?: boolean; value?: number }>(), {
  paused: false,
  value: 2048.0,
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
const output = ref<HTMLElement | null>(null);
watch(
  [active, () => props.value],
  (_, __, cleanup) => {
    if (!active.value || !output.value) return;
    const state = { value: 0 };
    const animation = animate(state, {
      value: props.value,
      duration: 1800,
      ease: 'out(4)',
      onUpdate: () => {
        if (output.value)
          output.value.textContent = Math.round(state.value).toLocaleString('en-US');
      },
    });
    cleanup(() => {
      animation.revert();
      if (output.value) output.value.textContent = props.value.toLocaleString('en-US');
    });
  },
  { flush: 'post' },
);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="count-up">
    <p class="bw-counter">
      <span class="bw-sr-only">{{ props.value }}</span
      ><span ref="output" aria-hidden="true">{{ props.value.toLocaleString('en-US') }}</span
      ><span aria-hidden="true">+</span>
    </p>
  </div>
</template>
