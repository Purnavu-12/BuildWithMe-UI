<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/flip-text.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './flip-text.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Flip text',
  paused: false,
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
  <div ref="root" class="bw-demo" :data-active="active" data-component="flip-text">
    <p class="adapt-flip" :aria-label="props.label">
      <span
        v-for="(letter, index) in props.label"
        :key="index"
        aria-hidden="true"
        :style="{ animationDelay: `${index * 45}ms` }"
        >{{ letter === ' ' ? ' ' : letter }}</span
      >
    </p>
  </div>
</template>
