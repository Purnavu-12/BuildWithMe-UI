<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './docs-table-of-contents.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Docs table of contents',
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
const index = ref(0);
const content = ref<HTMLDivElement | null>(null);
const sections = ['Overview', 'Installation', 'Customization'];
function track() {
  if (!content.value) return;
  let current = 0;
  content.value.querySelectorAll<HTMLElement>('[data-section]').forEach((node, i) => {
    if (node.offsetTop - content.value!.offsetTop <= content.value!.scrollTop + 30) current = i;
  });
  index.value = current;
}
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="docs-table-of-contents"
  >
    <div class="bwm-outline">
      <nav :aria-label="props.label">
        <a
          v-for="(section, i) in sections"
          :key="section"
          :href="`#${uid}-${i}`"
          :aria-current="index === i ? 'location' : undefined"
          @click="index = i"
          >{{ section }}</a
        >
      </nav>
      <div
        ref="content"
        class="bwm-document"
        tabindex="0"
        aria-label="Example document"
        @scroll="track"
      >
        <section v-for="(section, i) in sections" :key="section" :id="`${uid}-${i}`" data-section>
          <h3>{{ section }}</h3>
          <p>
            {{
              [
                'Start with a clear promise and a small set of useful components.',
                'Install the complete source closure in your chosen framework.',
                'Adjust semantic tokens, content, and motion to fit your product.',
              ][i]
            }}
          </p>
          <p>
            Keep technical reading surfaces calm. Let headings and spacing explain the structure.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
