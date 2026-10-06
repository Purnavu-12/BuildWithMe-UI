<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/elastic-stack.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './elastic-stack.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Elastic stack',
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
const selected = ref('Plan');
const items = ['Plan', 'Build', 'Review', 'Ship'];
const icons = ['01', '02', '03', '04'];
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="elastic-stack">
    <div>
      <nav class="adapt-elastic" :aria-label="props.label">
        <button
          v-for="(item, i) in items"
          :key="item"
          type="button"
          :aria-label="item"
          :aria-pressed="selected === item"
          @click="selected = item"
        >
          <span aria-hidden="true">{{ icons[i] }}</span
          ><b>{{ item }}</b>
        </button>
      </nav>
      <p class="bw-caption" role="status">{{ selected }} selected</p>
    </div>
  </div>
</template>
