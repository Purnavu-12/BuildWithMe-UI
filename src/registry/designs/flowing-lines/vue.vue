<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { animate, createScope, stagger } from 'animejs';
import '../../shared/base.css';
import './flowing-lines.css';
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
      animate('.bw-flow-line', {
        scaleY: [0.25, 1, 0.25],
        opacity: [0.2, 0.8, 0.2],
        duration: 2600,
        delay: stagger(130),
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
  <div ref="root" class="bw-demo" :data-active="active" data-component="flowing-lines">
    <div class="bw-flow" aria-hidden="true">
      <span
        v-for="i in 15"
        :key="i"
        class="bw-flow-line"
        :style="{ height: `${70 + Math.sin((i - 1) * 0.45) * 65}px` }"
      />
    </div>
  </div>
</template>
