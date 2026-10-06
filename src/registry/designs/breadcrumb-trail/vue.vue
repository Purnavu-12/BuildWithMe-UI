<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './breadcrumb-trail.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Breadcrumb trail',
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
const current = ref('Navigation');
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="breadcrumb-trail"
  >
    <nav class="bwm-breadcrumb" :aria-label="props.label">
      <ol>
        <li><button type="button" @click="current = 'Workspace'">Workspace</button></li>
        <li class="bwm-crumb-overflow">
          <details>
            <summary aria-label="Show parent pages">…</summary>
            <button type="button" @click="current = 'Library'">Library</button>
          </details>
        </li>
        <li>
          <button type="button" aria-current="page" @click="current = 'Navigation'">
            {{ current }}
          </button>
        </li>
      </ol>
    </nav>
  </div>
</template>
