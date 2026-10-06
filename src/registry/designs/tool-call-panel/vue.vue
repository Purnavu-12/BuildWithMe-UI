<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './tool-call-panel.css';
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
const payload = JSON.stringify({ query: 'button', engine: 'css', results: 3 }, null, 2);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="tool-call-panel">
    <div class="bw-panel bw-tool">
      <p class="bw-caption">Local demonstration</p>
      <button type="button" :aria-expanded="open" :aria-controls="uid" @click="open = !open">
        <span><span class="bw-tool-dot" />search_components</span
        ><span>{{ open ? '−' : '+' }}</span>
      </button>
      <p class="bw-description">3 matching components found</p>
      <pre v-if="open" :id="uid">{{ payload }}</pre>
    </div>
  </div>
</template>
