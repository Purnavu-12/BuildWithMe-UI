<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './animated-tabs.css';
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
const tabs = ['Design', 'Develop', 'Deliver'];
const copy = [
  'A good idea deserves a thoughtful interface.',
  'Turn the details into something that works.',
  'Put it into the world. Keep making it better.',
];
const selected = ref(0);
async function navigate(event: KeyboardEvent, index: number) {
  const next =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? 2
        : event.key === 'ArrowRight'
          ? (index + 1) % 3
          : event.key === 'ArrowLeft'
            ? (index + 2) % 3
            : -1;
  if (next < 0) return;
  event.preventDefault();
  selected.value = next;
  await nextTick();
  root.value?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus();
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="animated-tabs">
    <div class="bw-tab-box">
      <div class="bw-tabs" role="tablist" aria-label="Workflow">
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          type="button"
          :id="`${uid}-tab-${index}`"
          role="tab"
          :aria-selected="selected === index"
          :aria-controls="`${uid}-panel-${index}`"
          :tabindex="selected === index ? 0 : -1"
          @click="selected = index"
          @keydown="navigate($event, index)"
        >
          <span v-if="selected === index" class="bw-tab-indicator" /><span>{{ tab }}</span>
        </button>
      </div>
      <div
        class="bw-description bw-tab-copy"
        role="tabpanel"
        :id="`${uid}-panel-${selected}`"
        :aria-labelledby="`${uid}-tab-${selected}`"
        tabindex="0"
      >
        {{ copy[selected] }}
      </div>
    </div>
  </div>
</template>
