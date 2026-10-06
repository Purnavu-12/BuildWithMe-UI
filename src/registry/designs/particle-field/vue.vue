<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { animate, createScope, stagger } from 'animejs';
import '../../shared/base.css';
import './particle-field.css';
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
watch(
  active,
  (_, __, cleanup) => {
    if (!active.value || !root.value) return;
    const scope = createScope({ root: root.value }).add(() => {
      animate('.bw-particle', {
        y: [-8, 8],
        opacity: [0.2, 0.9],
        duration: 2400,
        delay: stagger(80),
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });
    });
    cleanup(() => scope.revert());
  },
  { flush: 'post' },
);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="particle-field">
    <div class="bw-particles" aria-hidden="true">
      <span
        v-for="n in 30"
        :key="n"
        class="bw-particle"
        :style="{
          left: `${((n - 1) * 37 + 11) % 100}%`,
          top: `${((n - 1) * 53 + 7) % 100}%`,
          width: `${((n - 1) % 3) + 2}px`,
          height: `${((n - 1) % 3) + 2}px`,
        }"
      />
    </div>
  </div>
</template>
