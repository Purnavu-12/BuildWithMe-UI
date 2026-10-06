<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './expandable-card.css';
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
const open = ref(false);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="expandable-card">
    <div class="bw-panel">
      <p class="bw-caption">Field notes · 001</p>
      <h3 class="bw-title">Less, but better.</h3>
      <button
        type="button"
        class="bw-expand-toggle"
        :aria-expanded="open"
        :aria-controls="uid"
        @click="open = !open"
      >
        {{ open ? 'Close the story −' : 'Read the story +' }}
      </button>
      <p v-if="open" :id="uid" class="bw-description">
        Start with the essentials. Give every element a purpose, every interaction a little care,
        and every idea room to breathe.
      </p>
    </div>
  </div>
</template>
