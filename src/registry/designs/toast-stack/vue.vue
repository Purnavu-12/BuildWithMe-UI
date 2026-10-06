<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './toast-stack.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Toast stack',
  className: '',
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
      false,
    );
});
watch(
  () => false,
  (value) => lifecycle?.setPaused(Boolean(value)),
);
onBeforeUnmount(() => lifecycle?.destroy());
const toasts = ref<{ id: number; remaining: number }[]>([]);
const timeoutPaused = ref(false);
let counter = 0;
watch(
  timeoutPaused,
  (_, __, cleanup) => {
    if (typeof document === 'undefined' || timeoutPaused.value) return;
    const timer = setInterval(() => {
      if (document.hidden || !toasts.value.length) return;
      toasts.value = toasts.value
        .map((item) => ({ ...item, remaining: item.remaining - 250 }))
        .filter((item) => item.remaining > 0);
    }, 250);
    cleanup(() => clearInterval(timer));
  },
  { immediate: true },
);
function add() {
  toasts.value = [...toasts.value.slice(-2), { id: ++counter, remaining: 6000 }];
}
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="toast-stack"
  >
    <div class="bwm-panel">
      <h3>{{ props.label }}</h3>
      <div class="bwm-row">
        <button type="button" @click="add">Add notification</button
        ><button
          type="button"
          :aria-pressed="timeoutPaused"
          @click="timeoutPaused = !timeoutPaused"
        >
          {{ timeoutPaused ? 'Resume timeouts' : 'Pause timeouts' }}
        </button>
      </div>
      <div class="bwm-toasts" role="status" aria-live="polite" aria-relevant="additions">
        <div v-for="item in toasts" :key="item.id" class="bwm-toast">
          <span>Source saved · {{ item.id }}</span
          ><button
            type="button"
            :aria-label="`Dismiss notification ${item.id}`"
            @click="toasts = toasts.filter((toast) => toast.id !== item.id)"
          >
            ×
          </button>
        </div>
      </div>
      <small>Notifications expire after six seconds. Pause keeps them available.</small>
    </div>
  </div>
</template>
