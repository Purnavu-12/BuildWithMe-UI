<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './adaptive-sidebar.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Adaptive sidebar',
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
const collapsed = ref(false);
const selected = ref('Overview');
const items = ['Overview', 'Components', 'Contribute'];
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="adaptive-sidebar"
  >
    <div class="bwm-sidebar" :data-collapsed="collapsed">
      <nav :aria-label="props.label">
        <button
          type="button"
          class="bwm-control"
          :aria-expanded="!collapsed"
          :aria-label="collapsed ? 'Expand navigation' : 'Collapse navigation'"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? '→' : '←' }}<span v-if="!collapsed">Workspace</span></button
        ><button
          v-for="(item, i) in items"
          :key="item"
          type="button"
          :aria-label="item"
          :aria-current="selected === item ? 'page' : undefined"
          @click="selected = item"
        >
          <b aria-hidden="true">{{ ['◈', '▦', '＋'][i] }}</b
          ><span v-if="!collapsed">{{ item }}</span>
        </button>
      </nav>
      <article>
        <small>WORKSPACE</small>
        <h3>{{ selected }}</h3>
        <p>
          {{
            selected === 'Overview'
              ? 'Your next interface starts here.'
              : selected === 'Components'
                ? 'Explore reusable building blocks.'
                : 'Share an idea. Keep its source open.'
          }}
        </p>
      </article>
    </div>
  </div>
</template>
