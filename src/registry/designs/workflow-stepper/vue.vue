<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './workflow-stepper.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Workflow stepper',
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
const step = ref(1);
const steps = ['Discover', 'Adapt', 'Ship'];
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="workflow-stepper"
  >
    <div class="bwm-panel">
      <ol class="bwm-steps" :aria-label="props.label">
        <li
          v-for="(entry, i) in steps"
          :key="entry"
          :data-state="i < step ? 'complete' : i === step ? 'active' : 'pending'"
        >
          <button type="button" :aria-current="i === step ? 'step' : undefined" @click="step = i">
            <b aria-hidden="true">{{ i < step ? '✓' : i + 1 }}</b
            >{{ entry
            }}<span class="bw-sr-only">{{
              i < step ? ' completed' : i === step ? ' current' : ' pending'
            }}</span>
          </button>
        </li>
      </ol>
      <p role="status">{{ steps[step] }} — step {{ step + 1 }} of 3</p>
      <div class="bwm-row">
        <button type="button" :disabled="step === 0" @click="step--">Back</button
        ><button type="button" :disabled="step === 2" @click="step++">Next</button>
      </div>
    </div>
  </div>
</template>
