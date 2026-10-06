<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/wave-grid-background.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './wave-grid-background.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Wave grid background',
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
  <div ref="root" class="bw-demo" :data-active="active" data-component="wave-grid-background">
    <div class="adapt-wave" role="img" :aria-label="props.label">
      <i
        v-for="index in 35"
        :key="index"
        :style="{
          animationDelay: `${((index - 1) % 7) * 55 + Math.floor((index - 1) / 7) * 40}ms`,
        }"
      />
    </div>
  </div>
</template>
