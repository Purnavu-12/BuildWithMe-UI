<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { animate } from 'animejs';
import '../../shared/base.css';
import './scramble-reveal.css';
const props = withDefaults(defineProps<{ paused?: boolean; text?: string }>(), {
  paused: false,
  text: 'HELLO, BUILDER.',
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
  [active, () => props.text],
  (_, __, cleanup) => {
    if (!active.value || !output.value) return;
    const state = { progress: 0 };
    const animation = animate(state, {
      progress: props.text.length,
      duration: 1300,
      ease: 'linear',
      onUpdate: () => {
        if (output.value)
          output.value.textContent = props.text
            .split('')
            .map((char, index) =>
              index < state.progress
                ? char
                : '01#/<>'[(index + Math.floor(state.progress * 3)) % 6],
            )
            .join('');
      },
    });
    cleanup(() => {
      animation.revert();
      if (output.value) output.value.textContent = props.text;
    });
  },
  { flush: 'post' },
);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="scramble-reveal">
    <p class="bw-scramble">
      <span class="bw-sr-only">{{ props.text }}</span
      ><span ref="output" aria-hidden="true">{{ props.text }}</span>
    </p>
  </div>
</template>
