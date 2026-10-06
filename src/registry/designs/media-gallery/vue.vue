<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { galleryImages } from '../../shared/gallery-assets';
import '../../shared/base.css';
import './media-gallery.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Media gallery',
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
const dialog = ref<HTMLDialogElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const item = computed(() => galleryImages[index.value]);
function key(e: KeyboardEvent) {
  let next: number;
  if (e.key === 'ArrowRight') next = (index.value + 1) % 3;
  else if (e.key === 'ArrowLeft') next = (index.value + 2) % 3;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = 2;
  else return;
  e.preventDefault();
  index.value = next;
}
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="media-gallery"
  >
    <div class="bwm-gallery">
      <figure :aria-label="props.label">
        <img :src="item.src" :alt="item.alt" />
        <figcaption>{{ item.title }} · {{ index + 1 }} / 3</figcaption>
      </figure>
      <div class="bwm-row">
        <button
          type="button"
          class="bwm-control"
          aria-label="Previous image"
          @click="index = (index + 2) % 3"
        >
          ←</button
        ><button
          v-for="(image, i) in galleryImages"
          :key="image.title"
          type="button"
          class="bwm-thumb"
          @keydown="key"
          :aria-label="`Show ${image.title}`"
          :aria-pressed="i === index"
          @click="index = i"
        >
          <img :src="image.src" alt="" /></button
        ><button
          type="button"
          class="bwm-control"
          aria-label="Next image"
          @click="index = (index + 1) % 3"
        >
          →
        </button>
      </div>
      <button
        ref="trigger"
        type="button"
        class="bwm-control"
        aria-haspopup="dialog"
        @click="dialog?.showModal()"
      >
        Open image
      </button>
      <dialog ref="dialog" class="bwm-modal" :aria-labelledby="uid" @close="trigger?.focus()">
        <h3 :id="uid">{{ item.title }}</h3>
        <img :src="item.src" :alt="item.alt" />
        <div class="bwm-row">
          <button type="button" class="bwm-control" @click="dialog?.close()">Close image</button>
        </div>
      </dialog>
    </div>
  </div>
</template>
