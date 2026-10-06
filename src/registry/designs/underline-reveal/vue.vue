<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './underline-reveal.css';
const props = withDefaults(defineProps<{ paused?: boolean; text?: string }>(), {
  paused: false,
  text: 'Make your mark.',
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
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="underline-reveal">
    <p class="bw-large-text bw-underline">{{ props.text }}</p>
  </div>
</template>
