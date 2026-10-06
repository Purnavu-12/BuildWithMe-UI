<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { galleryImages } from '../../shared/gallery-assets';
import '../../shared/base.css';
import './bento-hero.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Bento hero',
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
const selected = ref(false);
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="bento-hero"
  >
    <div class="bwm-bento">
      <article class="bwm-panel">
        <small>BUILDWITHME / UI</small>
        <h3>{{ props.label }}</h3>
        <p>Build the interface.<br />Keep the source.</p>
        <button type="button" :aria-pressed="selected" @click="selected = !selected">
          {{ selected ? 'Added to your canvas ✓' : 'Start a canvas ↗' }}
        </button>
      </article>
      <figure>
        <img :src="galleryImages[0].src" :alt="galleryImages[0].alt" />
        <figcaption>01 / Signal</figcaption>
      </figure>
      <aside class="bwm-panel">
        <strong>3 runtimes.</strong><span>One idea. Your framework.</span>
      </aside>
    </div>
  </div>
</template>
