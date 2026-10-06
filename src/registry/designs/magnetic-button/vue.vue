<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './magnetic-button.css';
const props = withDefaults(
  defineProps<{ paused?: boolean; label?: string; onClick?: () => void }>(),
  { paused: false, label: 'Pull me closer' },
);
const emit = defineEmits<{ click: [] }>();
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
const point = ref({ x: 0, y: 0 });
function move(event: PointerEvent) {
  if (!active.value) return;
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
  point.value = {
    x: (event.clientX - bounds.left - bounds.width / 2) * 0.22,
    y: (event.clientY - bounds.top - bounds.height / 2) * 0.22,
  };
}
watch(active, () => {
  if (!active.value) point.value = { x: 0, y: 0 };
});
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="magnetic-button">
    <button
      type="button"
      class="bw-button bw-magnetic"
      :style="{ transform: `translate(${point.x}px, ${point.y}px)` }"
      @pointermove="move"
      @pointerleave="point = { x: 0, y: 0 }"
      @click="emit('click')"
    >
      {{ props.label }}<span aria-hidden="true"> ↗</span>
    </button>
  </div>
</template>
