<!-- Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/button.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './deployment-button.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Deployment button',
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
const complete = ref(false);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="deployment-button">
    <div>
      <button type="button" class="adapt-deploy" @click="complete = !complete">
        <i aria-hidden="true" /><span>{{
          complete ? 'Preview ready · run again' : props.label
        }}</span
        ><b aria-hidden="true">{{ complete ? '✓' : '↗' }}</b>
      </button>
      <p class="bw-caption" role="status">
        {{
          complete
            ? 'Local deployment simulation complete. No files were published.'
            : 'Local simulation'
        }}
      </p>
    </div>
  </div>
</template>
