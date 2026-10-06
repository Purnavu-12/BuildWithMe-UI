<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
const props = withDefaults(defineProps<{ paused?: boolean; onAction?: () => Promise<void> }>(), {
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
const status = ref('idle');
let alive = true;
let timer: ReturnType<typeof setTimeout> | undefined;
onBeforeUnmount(() => {
  alive = false;
  clearTimeout(timer);
});
async function run() {
  if (status.value === 'working') return;
  status.value = 'working';
  try {
    await (props.onAction
      ? props.onAction()
      : new Promise<void>((resolve) => (timer = setTimeout(resolve, 1200))));
    if (alive) status.value = 'done';
  } catch {
    if (alive) status.value = 'error';
  }
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="async-status-button">
    <button
      type="button"
      class="bw-button"
      :disabled="status === 'working'"
      :aria-busy="status === 'working'"
      @click="run"
    >
      <span role="status">{{
        status === 'working'
          ? 'Saving…'
          : status === 'done'
            ? '✓ Saved. Run again?'
            : status === 'error'
              ? 'Try again'
              : 'Save your changes'
      }}</span>
    </button>
  </div>
</template>
