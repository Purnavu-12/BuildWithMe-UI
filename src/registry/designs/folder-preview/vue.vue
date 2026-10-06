<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/folder-preview.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './folder-preview.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean; files?: string[] }>(), {
  label: 'Folder preview',
  paused: false,
  files: () => ['manifest.ts', 'react.tsx', 'styles.css'],
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
  <div ref="root" class="bw-demo" :data-active="active" data-component="folder-preview">
    <details class="adapt-folder">
      <summary>
        {{ props.label }}<span>{{ props.files.length }} files</span>
      </summary>
      <div>
        <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
        <ul class="bw-folder-files">
          <li v-for="(file, index) in props.files" :key="`${file}-${index}`">{{ file }}</li>
        </ul>
      </div>
    </details>
  </div>
</template>
