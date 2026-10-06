<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glow-border-card.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './glow-border-card.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Glow border card',
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
  <div ref="root" class="bw-demo" :data-active="active" data-component="glow-border-card">
    <article class="adapt-glow-card">
      <span>INTERFACE / 07</span>
      <h3>{{ props.label }}</h3>
      <p>One clear surface, one moving signal, and source you can keep.</p>
      <details>
        <summary>Inspect source ↗</summary>
        <pre>border: 1px solid var(--bw-border);</pre>
      </details>
    </article>
  </div>
</template>
