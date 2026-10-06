<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/radial-glow-button.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './radial-glow-button.css';
const props = withDefaults(
  defineProps<{ label?: string; paused?: boolean; onClick?: () => void }>(),
  { label: 'Radial glow button', paused: false },
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
function move(event: PointerEvent) {
  if (!active.value) return;
  const el = event.currentTarget as HTMLElement;
  const box = el.getBoundingClientRect();
  el.style.setProperty('--rx', `${event.clientX - box.left}px`);
  el.style.setProperty('--ry', `${event.clientY - box.top}px`);
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="radial-glow-button">
    <button type="button" class="adapt-radial" @pointermove="move" @click="emit('click')">
      <span>{{ props.label }}</span
      ><i aria-hidden="true" />
    </button>
  </div>
</template>
