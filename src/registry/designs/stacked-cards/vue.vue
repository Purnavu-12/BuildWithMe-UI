<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './stacked-cards.css';
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
const index = ref(0);
const ideas = ['Start something.', 'Make it useful.', 'Share the source.'];
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="stacked-cards">
    <div class="bw-stack">
      <span class="bw-stack-back" aria-hidden="true" /><button
        type="button"
        class="bw-panel bw-stack-front"
        :aria-label="`${ideas[index]} Shuffle cards`"
        @click="index = (index + 1) % ideas.length"
      >
        <span class="bw-caption">IDEA 0{{ index + 1 }} / 03</span
        ><span class="bw-title">{{ ideas[index] }}</span
        ><span class="bw-description">Click to shuffle ↗</span>
      </button>
    </div>
  </div>
</template>
