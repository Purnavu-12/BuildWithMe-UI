<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';
import { galleryImages } from '../../shared/gallery-assets';
import '../../shared/base.css';
import './product-quick-view.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Product quick view',
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
const dialog = ref<HTMLDialogElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const size = ref('Medium');
const added = ref(false);
const image = galleryImages[0];
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="product-quick-view"
  >
    <button
      ref="trigger"
      type="button"
      class="bwm-control"
      aria-haspopup="dialog"
      @click="dialog?.showModal()"
    >
      Open {{ props.label }}
    </button>
    <dialog ref="dialog" class="bwm-modal" :aria-labelledby="uid" @close="trigger?.focus()">
      <img :src="image.src" :alt="image.alt" />
      <h3 :id="uid">{{ props.label }}</h3>
      <p>Signal object · $48 · local demonstration</p>
      <fieldset>
        <legend>Size</legend>
        <div class="bwm-row">
          <label v-for="option in ['Small', 'Medium', 'Large']" :key="option"
            ><input
              type="radio"
              :name="uid"
              :value="option"
              v-model="size"
              @change="added = false"
            />{{ option }}</label
          >
        </div>
      </fieldset>
      <div class="bwm-row">
        <button type="button" class="bwm-control" @click="added = true">Add to selection</button
        ><button type="button" class="bwm-control" @click="dialog?.close()">
          Close quick view
        </button>
      </div>
      <p role="status">
        {{ added ? `${size} Signal object added locally. No order placed.` : '' }}
      </p>
    </dialog>
  </div>
</template>
