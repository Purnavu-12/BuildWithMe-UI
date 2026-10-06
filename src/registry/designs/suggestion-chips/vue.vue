<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './suggestion-chips.css';
const props = withDefaults(
  defineProps<{ paused?: boolean; options?: string[]; onSelect?: (value: string) => void }>(),
  {
    paused: false,
    options: () => ['Design a landing page', 'Explore an idea', 'Write something useful'],
  },
);
const emit = defineEmits<{ select: [value: string] }>();
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
const selected = ref('');
function choose(value: string) {
  selected.value = value;
  emit('select', value);
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="suggestion-chips">
    <div class="bw-chips">
      <p class="bw-caption">A place to start</p>
      <button
        v-for="(option, index) in props.options"
        :key="index"
        type="button"
        :aria-pressed="selected === option"
        @click="choose(option)"
      >
        {{ option }}<span aria-hidden="true">↗</span>
      </button>
    </div>
  </div>
</template>
