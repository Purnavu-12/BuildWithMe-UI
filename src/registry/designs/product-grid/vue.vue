<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/product-grid.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { galleryImages } from '../../shared/gallery-assets';
import '../../shared/base.css';
import './product-grid.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Product grid',
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
const selected = ref('');
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="product-grid">
    <div>
      <div class="adapt-products" :aria-label="props.label">
        <button
          v-for="(item, index) in galleryImages"
          :key="item.title"
          type="button"
          :aria-pressed="selected === item.title"
          @click="selected = item.title"
        >
          <img :src="item.src" :alt="item.alt" /><span
            ><b>{{ item.title }}</b
            ><small>${{ [89, 240, 64][index] }}</small></span
          >
        </button>
      </div>
      <p class="bw-caption" role="status">
        {{ selected ? `${selected} selected locally.` : 'Example objects · no checkout' }}
      </p>
    </div>
  </div>
</template>
