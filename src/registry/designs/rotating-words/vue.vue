<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './rotating-words.css';
const props = withDefaults(defineProps<{ paused?: boolean; words?: string[] }>(), {
  paused: false,
  words: () => ['beautiful.', 'accessible.', 'yours.'],
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
const index = ref(0);
const current = computed(() => props.words[index.value % props.words.length] ?? 'yours.');
watch([active, () => props.words.length], (_, __, cleanup) => {
  if (!active.value || !props.words.length) return;
  const timer = setInterval(() => (index.value = (index.value + 1) % props.words.length), 2400);
  cleanup(() => clearInterval(timer));
});
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="rotating-words">
    <p class="bw-large-text">
      Build it<br /><span class="bw-sr-only">{{ props.words.join(' ') || 'yours.' }}</span
      ><span class="bw-rotating" aria-hidden="true">{{ current }}</span>
    </p>
  </div>
</template>
