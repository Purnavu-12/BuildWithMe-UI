<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { animate, createScope, stagger } from 'animejs';
import '../../shared/base.css';
import './stagger-reveal.css';
const props = withDefaults(defineProps<{ paused?: boolean; text?: string }>(), {
  paused: false,
  text: 'Ideas into interfaces.',
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
watch(
  [active, () => props.text],
  (_, __, cleanup) => {
    if (!active.value || !root.value) return;
    const scope = createScope({ root: root.value }).add(() => {
      animate('.bw-word', {
        opacity: [0, 1],
        y: [16, 0],
        delay: stagger(110),
        duration: 700,
        ease: 'out(3)',
      });
    });
    cleanup(() => scope.revert());
  },
  { flush: 'post' },
);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="stagger-reveal">
    <p class="bw-large-text">
      <span class="bw-sr-only">{{ props.text }}</span
      ><span
        v-for="(word, index) in props.text.split(' ')"
        :key="index"
        class="bw-word"
        aria-hidden="true"
        >{{ word }}
      </span>
    </p>
  </div>
</template>
