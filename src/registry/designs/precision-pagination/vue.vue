<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/pagination.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './precision-pagination.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Precision pagination',
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
const page = ref(2);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="precision-pagination">
    <nav class="adapt-pagination" :aria-label="props.label">
      <button type="button" aria-label="Previous page" :disabled="page === 1" @click="page--">
        ←</button
      ><button
        v-for="n in 4"
        :key="n"
        type="button"
        :aria-current="page === n ? 'page' : undefined"
        @click="page = n"
      >
        {{ n }}</button
      ><button type="button" aria-label="Next page" :disabled="page === 4" @click="page++">
        →
      </button>
    </nav>
  </div>
</template>
